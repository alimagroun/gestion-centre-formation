package com.centre.poly.classmanagement.service;

import com.centre.poly.classmanagement.dto.*;
import com.centre.poly.classmanagement.entity.*;
import com.centre.poly.classmanagement.mapper.ClassMapper;
import com.centre.poly.classmanagement.repository.*;
import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.InvalidRequestException;
import com.centre.poly.exception.NotFoundException;
import com.centre.poly.person.Repository.PersonRepository;
import com.centre.poly.person.entity.Student;
import com.centre.poly.person.service.PersonService;
import com.centre.poly.schoolYear.SchoolYear;
import com.centre.poly.schoolYear.SchoolYearRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final FormationTypeRepository formationTypeRepository;
    private final DomaineRepository domaineRepository;
    private final SchoolYearRepository schoolYearRepository;
    private final ClasseFormationRepository classeFormationRepository;
    private final ClassMapper classMapper;
    private final AccreditedClassRepository accreditedClassRepository;
    private final AcceleratedClassRepository acceleratedClassRepository;
    private final SpecialtyRepository specialtyRepository;
    private final PersonService personService;
    private final PersonRepository personRepository;
    private final AcceleratedClassEntryRepository acceleratedClassEntryRepository;
    //private final AcceleratedClassEntryRepository acceleratedClassEntryRepository;

    public Long saveAccreditedClass(AccreditedClassRequest request) {

        Specialty specialty = specialtyRepository.findById(request.getSpecialtyId()).orElseThrow(() -> new NotFoundException("Specialty not found"));
        SchoolYear schoolYear = schoolYearRepository.findById(request.getSchoolYearId()).orElseThrow(() -> new NotFoundException("School year not found"));

        classeFormationRepository.findAccreditedClass(request.getSpecialtyId(), request.getSchoolYearId(), request.getGroupNumber(), request.getYearLevel()).ifPresent(existingClass -> {
            throw new DuplicateEntityException("Classe already exists");
        });

        return classeFormationRepository.save(classMapper.toAccreditedClass(request)).getId();
    }

    public Long saveAcceleratedClass(AcceleratedClassRequest request) {

        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new InvalidRequestException("End year must be greater than or equal to start year");
        }

        Specialty specialty = specialtyRepository.findById(request.getSpecialtyId()).orElseThrow(() -> new NotFoundException("Specialty not found"));

        classeFormationRepository.findAcceleratedClass(request.getSpecialtyId(), request.getGroupNumber(), request.getStartDate(), request.getEndDate()).ifPresent(existingClass -> {
            throw new DuplicateEntityException("Classe already exists");
        });

        return classeFormationRepository.save(classMapper.toAcceleratedClass(request)).getId();
    }

    public PageResponse<AccreditedClassResponse> findAllAccreditedClass(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<AccreditedClass> classeFormationPage = accreditedClassRepository.findAll(pageable);
        List<AccreditedClassResponse> list = classeFormationPage.stream().map(classMapper::toResponseAccreditedClass).toList();
        return new PageResponse<>(list, classeFormationPage.getNumber(), classeFormationPage.getSize(), classeFormationPage.getTotalElements(), classeFormationPage.getTotalPages(), classeFormationPage.isFirst(), classeFormationPage.isLast());
    }

    public PageResponse<AcceleratedClassResponse> findAllAcceleratedClass(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<AcceleratedClass> classeFormationPage = acceleratedClassRepository.findAll(pageable);
        List<AcceleratedClassResponse> list = classeFormationPage.stream().map(classMapper::toResponseAccelerated).toList();
        return new PageResponse<>(list, classeFormationPage.getNumber(), classeFormationPage.getSize(), classeFormationPage.getTotalElements(), classeFormationPage.getTotalPages(), classeFormationPage.isFirst(), classeFormationPage.isLast());
    }

    public List<AcceleratedClass> findAll() {
        AcceleratedClass acceleratedClass = acceleratedClassRepository.findById(Long.valueOf(1)).orElseThrow(() -> new NotFoundException("AcceleratedClass not found"));
        return acceleratedClassRepository.findAll();
    }

    /*public AcceleratedClassEntry addEntry(Long studentId, Long classId) {
        Student student = personRepository.findStudentById(studentId).orElseThrow(() -> new NotFoundException("Student not found"));
        AcceleratedClass acceleratedClass = acceleratedClassRepository.findById(classId).orElseThrow(() -> new NotFoundException("AcceleratedClass not found"));

        Optional<AcceleratedClassEntry> verify = acceleratedClassRepository.findByStudentAndAcceleratedClass(studentId, classId);
        if (verify.isPresent()) {
            throw new DuplicateEntityException("student already exists in this class");
        }

        AcceleratedClassEntry entry = new AcceleratedClassEntry();
        entry.setStudent(student);
        entry.setAcceleratedClass(acceleratedClass);
        return acceleratedClassEntryRepository.save(entry);
    }*/

    public List<StudentAcceleratedClassResponse> findAllStudentAcceleratedClass(Long classId){
        AcceleratedClass acceleratedClass = acceleratedClassRepository.findById(classId).orElseThrow(() -> new NotFoundException("AcceleratedClass not found"));
        List<AcceleratedClassEntry> entryList = acceleratedClassEntryRepository.findAllByClassId(classId);
        List<StudentAcceleratedClassResponse> responseList =
                entryList.stream().map(classMapper::toStudentAcceleratedClassResponse).toList();
        return responseList;
    }

    public List<AccreditedClassResponse> findAllAccreditedClassBySpecialty(Long specialtyId) {

        Specialty specialty = specialtyRepository.findById(specialtyId).orElseThrow(() -> new NotFoundException("Specialty not found"));
        List<AccreditedClass> list = accreditedClassRepository.findAllBySpecialty(specialtyId);
        List<AccreditedClassResponse> responses =
                list.stream().map(classMapper::toResponseAccreditedClass).toList();
        return responses;
    }

    public List<AcceleratedClassResponse> findAllAcceleratedClassBySpecialty(Long specialtyId) {

        Specialty specialty = specialtyRepository.findById(specialtyId).orElseThrow(() -> new NotFoundException("Specialty not found"));
        List<AcceleratedClass> list = acceleratedClassRepository.findAllBySpecialty(specialtyId);
        List<AcceleratedClassResponse> responses =
                list.stream().map(classMapper::toResponseAccelerated).toList();
        return responses;
    }
}
