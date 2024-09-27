package com.centre.poly.classmanagement.service;

import com.centre.poly.classmanagement.dto.ClasseFormationRequest;
import com.centre.poly.classmanagement.dto.ClasseFormationResponse;
import com.centre.poly.classmanagement.dto.FormationResponse;
import com.centre.poly.classmanagement.entity.ClasseFormation;
import com.centre.poly.classmanagement.entity.Domaine;
import com.centre.poly.classmanagement.entity.Formation;
import com.centre.poly.classmanagement.mapper.ClasseFormationMapper;
import com.centre.poly.classmanagement.repository.ClasseFormationRepository;
import com.centre.poly.classmanagement.repository.DomaineRepository;
import com.centre.poly.classmanagement.repository.FormationRepository;
import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.NotFoundException;
import com.centre.poly.schoolYear.SchoolYear;
import com.centre.poly.schoolYear.SchoolYearRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClasseFormationService {

    private final FormationRepository formationRepository;
    private final DomaineRepository domaineRepository;
    private final SchoolYearRepository schoolYearRepository;
    private final ClasseFormationRepository classeFormationRepository;
    private final ClasseFormationMapper classeFormationMapper;

    public Long save(ClasseFormationRequest request) {
        Formation formation = formationRepository.findById(request.getFormationId())
                .orElseThrow(() -> new NotFoundException("Formation not found"));

        Domaine domaine = domaineRepository.findById(request.getDomaineId())
                .orElseThrow(() -> new NotFoundException("Domaine not found"));

        SchoolYear schoolYear = schoolYearRepository.findById(request.getSchoolYearId())
                .orElseThrow(() -> new NotFoundException("School year not found"));

        classeFormationRepository.findClasseFromation(request.getFormationId(), request.getDomaineId(), request.getSchoolYearId(), request.getGroupNumber(), request.getYearLevel())
                .ifPresent(existingClass -> {
                    throw new DuplicateEntityException("ClasseFormation already exists");
                });

        return classeFormationRepository.save(classeFormationMapper.toEntity(request)).getId();
    }

    public PageResponse<ClasseFormationResponse> findAll(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<ClasseFormation> classeFormationPage = classeFormationRepository.findAll(pageable);
        List<ClasseFormationResponse> list = classeFormationPage.stream().map(classeFormationMapper::toResponse).toList();
        return new PageResponse<>(list, classeFormationPage.getNumber(), classeFormationPage.getSize(), classeFormationPage.getTotalElements(), classeFormationPage.getTotalPages(), classeFormationPage.isFirst(), classeFormationPage.isLast());
    }
}
