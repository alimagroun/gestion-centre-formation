package com.centre.poly.registration.service;

import com.centre.poly.classmanagement.entity.Specialty;
import com.centre.poly.classmanagement.repository.SpecialtyRepository;
import com.centre.poly.common.PageResponse;
import com.centre.poly.document.Document;
import com.centre.poly.document.DocumentsRepository;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.NotFoundException;
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
import com.centre.poly.registration.entity.RegistrationStatus;
import com.centre.poly.registration.mapper.RegistrationMapper;
import com.centre.poly.registration.repository.RegistrationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final PersonService personService;
    private final ParentMapper parentMapper;
    private final StudentMapper studentMapper;
    private final DocumentsRepository documentsRepository;
    private final RegistrationMapper registrationMapper;
    private final SpecialtyRepository specialtyRepository;

    @Transactional
    public Long save(RegistrationRequest request) {

        // Validate parent and student phone number and email
        validateParentStudentContactInfo(request);

        // Create Address entity from request
        Address address = createAddressFromRequest(request.addressRequest());

        // Save Parent and Student entities
        Parent parentSaved = personService.saveParent(parentMapper.toParent(request.parentRequest()), address);
        Student studentSaved = personService.saveStudent(studentMapper.toStudent(request.studentRequest()),parentSaved,address);

        // Retrieve and validate documents
        List<Document> documentList = getValidatedDocuments(request.documents());

        //Registration specialty
        Specialty specialty = verifSpecialty(request.specialtyId());

        // Create and save Registration entity
        Registration registration = buildRegistration(studentSaved, documentList, request.remarks(), specialty, request.registrationFees());

        return registrationRepository.save(registration).getId();

    }

    private Registration buildRegistration(Student student, List<Document> documents, String remarks, Specialty specialty, Double registrationFees) {
        Registration registration = new Registration();
        registration.setStudent(student);
        registration.setStatus(RegistrationStatus.IN_PROGRESS);
        registration.setDocuments(documents);
        registration.setRegistrationFees(registrationFees);
        registration.setRemarks(remarks);
        registration.setSpecialty(specialty);
        return registration;
    }
    private List<Document> getValidatedDocuments(List<Long> documentIds) {
        List<Document> documentList = documentsRepository.findAllById(documentIds);
        if (documentList.size() != documentIds.size()) {
            throw new NotFoundException("The number of retrieved documents does not match the number of requested documents.");
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

    private void validateParentStudentContactInfo(RegistrationRequest request) {
        if(Objects.equals(request.parentRequest().phoneNumber(), request.studentRequest().phoneNumber())){
            throw new DuplicateEntityException("The parent's phone number cannot be the same as the student's phone number.");
        }

        if (!request.parentRequest().email().isEmpty() && !request.studentRequest().email().isEmpty() && Objects.equals(request.parentRequest().email(), request.studentRequest().email())){
            throw new DuplicateEntityException("The parent's email cannot be the same as the student's email.");
        }
    }

    public PageResponse<RegistrationResponse> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Registration> registrationPage = registrationRepository.findAll(pageable);
        List<RegistrationResponse> registrationResponses =
                registrationPage.stream().map(registrationMapper::toResponse).toList();
        return new PageResponse<>(registrationResponses, registrationPage.getNumber(), registrationPage.getSize(), registrationPage.getTotalElements(), registrationPage.getTotalPages(), registrationPage.isFirst(), registrationPage.isLast());
    }

    public RegistrationDetailsResponse findById(Long id) {
        Registration registration = registrationRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Registration with ID " + id + " not found")
        );

        return registrationMapper.toRegistrationResponse(registration);
    }

    private Specialty verifSpecialty(Long id){
        Specialty specialty = specialtyRepository.findById(id).orElseThrow(() -> new NotFoundException("Specialty with ID " + id + " not found"));
        return specialty;
    }

}
