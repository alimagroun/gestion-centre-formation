package com.centre.poly.registration.service;

import com.centre.poly.classmanagement.entity.*;
import com.centre.poly.classmanagement.repository.*;
import com.centre.poly.common.PageResponse;
import com.centre.poly.document.Document;
import com.centre.poly.document.DocumentsRepository;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.NotFoundException;
import com.centre.poly.person.Repository.PersonRepository;
import com.centre.poly.person.dto.ParentMapper;
import com.centre.poly.person.dto.StudentMapper;
import com.centre.poly.person.entity.Address;
import com.centre.poly.person.entity.Parent;
import com.centre.poly.person.entity.Student;
import com.centre.poly.person.service.PersonService;
import com.centre.poly.registration.dto.AddressRequest;
import com.centre.poly.registration.dto.RegistrationDetailsResponse;
import com.centre.poly.registration.dto.RegistrationRequest;
import com.centre.poly.registration.dto.RegistrationResponse;
import com.centre.poly.registration.entity.Registration;
import com.centre.poly.registration.entity.RegistrationDocumentEntry;
import com.centre.poly.registration.entity.RegistrationStatus;
import com.centre.poly.registration.mapper.RegistrationMapper;
import com.centre.poly.registration.repository.RegistrationDocumentEntryRepository;
import com.centre.poly.registration.repository.RegistrationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegistrationService {
    
    private final RegistrationRepository registrationRepository;
    private final PersonService personService;
    private final ParentMapper parentMapper;
    private final StudentMapper studentMapper;
    private final DocumentsRepository documentsRepository;
    private final RegistrationMapper registrationMapper;
    private final SpecialtyRepository specialtyRepository;
    private final RegistrationDocumentEntryRepository registrationDocumentEntryRepository;
    private final AcceleratedClassEntryRepository acceleratedClassEntryRepository;
    private final PersonRepository personRepository;
    private final AcceleratedClassRepository acceleratedClassRepository;
    private final AccreditedClassRepository accreditedClassRepository;
    private final AccreditedClassEntryRepository accreditedClassEntryRepository;
    
    @Transactional
    public Long save(RegistrationRequest request) {
        log.info("Starting registration process for student: {}", request);
        
        // Validate parent and student phone number and email
        checkRequestValidation(request);
        
        // Create Address entity from request
        Address address = createAddressFromRequest(request.addressRequest());
        
        // Save Parent and Student entities
        Parent motherSaved = null;
        Parent fatherSaved = null;
        
        if (request.motherRequest().isChecked()) {
            motherSaved = personService.saveParent(parentMapper.toParent(request.motherRequest()), address);
        }
        
        if (request.fatherRequest().isChecked()) {
            fatherSaved = personService.saveParent(parentMapper.toParent(request.fatherRequest()), address);
        }
        
        Student studentSaved = personService.saveStudent(studentMapper.toStudent(request.studentRequest()),
                                                         motherSaved,
                                                         fatherSaved,
                                                         address);
        
        
        // Retrieve and validate documents
        List<Document> documentList = getValidatedDocuments(request.documents());
        
        //Registration specialty
        Specialty specialty = verifSpecialty(request.specialtyId());
        
        // Create and save Registration entity
        Registration registration = buildRegistration(studentSaved,
                                                      documentList,
                                                      request.remarks(),
                                                      specialty,
                                                      request.registrationFees());
        
        //Save registration
        registration.setIsAffected(false);
        registration = registrationRepository.save(registration);
        
        // Create and save registration documents entry
        saveRegistrationDcuments(documentList, registration);
        
        log.info("Registration process completed for student: {}", registration);
        return registration.getId();
    }
    
    private Registration buildRegistration(Student student, List<Document> documents, String remarks, Specialty specialty, Double registrationFees) {
        Registration registration = new Registration();
        registration.setStudent(student);
        registration.setStatus(RegistrationStatus.IN_PROGRESS);
        registration.setRegistrationFees(registrationFees);
        registration.setRemarks(remarks);
        registration.setSpecialty(specialty);
        return registration;
    }
    
    private List<Document> getValidatedDocuments(List<Long> documentIds) {
        List<Document> documentList = documentsRepository.findAllById(documentIds);
        if (documentList.size() != documentIds.size()) {
            throw new NotFoundException(
                    "The number of retrieved documents does not match the number of requested documents.");
        }
        return documentList;
    }
    
    private Address createAddressFromRequest(AddressRequest addressRequest) {
        return Address.builder()
                      .city(addressRequest.city())
                      .street(addressRequest.street())
                      .zipCode(addressRequest.zipCode())
                      .build();
    }
    
    private void checkRequestValidation(RegistrationRequest request) {
        
        request.validateParents();
        
        if (request.motherRequest().isChecked() && request.fatherRequest().isChecked()) {
            if (Objects.equals(request.fatherRequest().phoneNumber(), request.motherRequest().phoneNumber())) {
                throw new DuplicateEntityException(
                        "The parent's phone number cannot be the same as the student's phone number.");
            }
            
            if (!request.motherRequest().email().isEmpty() && !request.fatherRequest().email().isEmpty() &&
                    request.motherRequest().email().equals(request.fatherRequest().email())
            
            ) {
                throw new DuplicateEntityException("The mother's email cannot be the same as the father email.");
            }
        }
        
        if (request.motherRequest().isChecked()) {
            if (!request.motherRequest().email().isEmpty() &&
                    Objects.equals(request.motherRequest().email(), request.studentRequest().email())) {
                throw new DuplicateEntityException("The mother's email cannot be the same as the student's email.");
            }
            if (!request.motherRequest().phoneNumber().isEmpty() &&
                    Objects.equals(request.motherRequest().phoneNumber(), request.studentRequest().phoneNumber())) {
                throw new DuplicateEntityException(
                        "The mother's phone number cannot be the same as the student's phone number.");
            }
            
        }
        
        if (request.fatherRequest().isChecked()) {
            if (!request.fatherRequest().email().isEmpty() &&
                    Objects.equals(request.fatherRequest().email(), request.studentRequest().email())) {
                throw new DuplicateEntityException("The father's email cannot be the same as the student's email.");
            }
            
            if (!request.fatherRequest().phoneNumber().isEmpty() &&
                    Objects.equals(request.fatherRequest().phoneNumber(), request.studentRequest().phoneNumber())) {
                throw new DuplicateEntityException(
                        "The father's phone number cannot be the same as the student's phone number.");
            }
            
        }
        
    }
    
    public PageResponse<RegistrationResponse> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Registration> registrationPage = registrationRepository.findAll(pageable);
        List<RegistrationResponse> registrationResponses = registrationPage.stream()
                                                                           .map(registrationMapper::toResponse)
                                                                           .toList();
        return new PageResponse<>(registrationResponses,
                                  registrationPage.getNumber(),
                                  registrationPage.getSize(),
                                  registrationPage.getTotalElements(),
                                  registrationPage.getTotalPages(),
                                  registrationPage.isFirst(),
                                  registrationPage.isLast());
    }
    
    public RegistrationDetailsResponse findById(Long id) {
        Registration registration = registrationRepository.findById(id)
                                                          .orElseThrow(() -> new NotFoundException(
                                                                  "Registration with ID " + id + " not found"));
        
        return registrationMapper.toRegistrationResponse(registration);
    }
    
    private Specialty verifSpecialty(Long id) {
        Specialty specialty = specialtyRepository.findById(id)
                                                 .orElseThrow(() -> new NotFoundException(
                                                         "Specialty with ID " + id + " not found"));
        return specialty;
    }
    
    private void saveRegistrationDcuments(List<Document> documentList, Registration registration) {
        
        List<RegistrationDocumentEntry> documentEntries = new ArrayList<>();
        
        documentList.forEach(l -> {
            RegistrationDocumentEntry documentEntry = new RegistrationDocumentEntry();
            documentEntry.setDocument(l);
            documentEntry.setRegistration(registration);
            documentEntries.add(documentEntry);
        });
        
        registrationDocumentEntryRepository.saveAll(documentEntries);
    }
    
    public Long addDocumentToRegistration(Long registrationId, Long documentId) {
        
        // Validate the existence
        Registration registration = registrationRepository.findById(registrationId)
                                                          .orElseThrow(() -> new NotFoundException(
                                                                  "Registration with ID " + registrationId +
                                                                          " not found"));
        Document document = documentsRepository.findById(documentId)
                                               .orElseThrow(() -> new NotFoundException(
                                                       "Document " + documentId + " not found"));
        
        // Check if the document is already associated with the registration to prevent duplicates
        Optional<RegistrationDocumentEntry> registrationDocumentEntry = registrationDocumentEntryRepository.findByRegistrationAndDocument(
                registrationId,
                documentId);
        if (registrationDocumentEntry.isPresent()) {
            throw new DuplicateEntityException(
                    "The document with ID " + documentId + " already exists in this registration.");
        }
        
        // Create and save a new RegistrationDocumentEntry
        return registrationDocumentEntryRepository.save(RegistrationDocumentEntry.builder()
                                                                                 .document(document)
                                                                                 .registration(registration)
                                                                                 .build()).getId();
    }
    
    @Transactional
    public Long addStudentToAcceleratedClass(Long studentId, Long registrationId, Long acceleratedClassId) {
        
        // Validate the existence
        Student student = personRepository.findStudentById(studentId)
                                          .orElseThrow(() -> new NotFoundException(
                                                  "Student " + studentId + " not found"));
        AcceleratedClass acceleratedClass = acceleratedClassRepository.findById(acceleratedClassId)
                                                                      .orElseThrow(() -> new NotFoundException(
                                                                              "AcceleratedClass " + acceleratedClassId +
                                                                                      " not found"));
        Registration registration = registrationRepository.findById(registrationId)
                                                          .orElseThrow(() -> new NotFoundException(
                                                                  "Registration " + registrationId + " not found"));
        
        // Check if student is already associated with this class
        Optional<AcceleratedClassEntry> acceleratedClassEntry = acceleratedClassEntryRepository.findByStudentAndClass(
                studentId,
                acceleratedClassId);
        if (acceleratedClassEntry.isPresent()) {
            throw new DuplicateEntityException("The student is already enrolled in this class.");
        }
        
        registration.setIsAffected(true);
        registrationRepository.save(registration);
        
        AcceleratedClassEntry classEntry = new AcceleratedClassEntry();
        classEntry.setStudent(student);
        classEntry.setAcceleratedClass(acceleratedClass);
        return acceleratedClassEntryRepository.save(classEntry).getId();
    }
    
    public Long addStudentToAccreditClass(Long studentId, Long registrationId, Long accreditClassId) {
        
        // Validate the existence
        Student student = personRepository.findStudentById(studentId)
                                          .orElseThrow(() -> new NotFoundException(
                                                  "Student " + studentId + " not found"));
        AccreditedClass accreditedClass = accreditedClassRepository.findById(accreditClassId)
                                                                   .orElseThrow(() -> new NotFoundException(
                                                                           "AcceleratedClass " + accreditClassId +
                                                                                   " not found"));
        Registration registration = registrationRepository.findById(registrationId)
                                                          .orElseThrow(() -> new NotFoundException(
                                                                  "Registration " + registrationId + " not found"));
        
        // Check if student is already associated with this class
        Optional<AccreditedClassEntry> accreditedClassEntry = accreditedClassEntryRepository.findByStudentAndClass(
                studentId,
                accreditClassId);
        if (accreditedClassEntry.isPresent()) {
            throw new DuplicateEntityException("The student is already enrolled in this class.");
        }
        
        registration.setIsAffected(true);
        registrationRepository.save(registration);
        
        AccreditedClassEntry classEntry = new AccreditedClassEntry();
        classEntry.setStudent(student);
        classEntry.setAccreditedClass(accreditedClass);
        return accreditedClassEntryRepository.save(classEntry).getId();
    }
    
    public Long updateRegistrationStatus(Long registrationId, RegistrationStatus status, String statusChangeReason) {
        Registration registration = registrationRepository.findById(registrationId)
                                                          .orElseThrow(() -> new NotFoundException(
                                                                  "Registration not found with id: " + registrationId));
        
        registration.setStatus(status);
        registration.setStatusChangeReason(statusChangeReason);
        registration = registrationRepository.save(registration);
        
        return registration.getId();
    }
    
}
