package com.centre.poly.specialty.service;

import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.specialty.controller.SpecialtyController;
import com.centre.poly.specialty.dto.FormationResponse;
import com.centre.poly.specialty.dto.SpecialtyRequest;
import com.centre.poly.specialty.dto.SpecialtyResponse;
import com.centre.poly.specialty.entities.Domain;
import com.centre.poly.specialty.entities.Formation;
import com.centre.poly.specialty.entities.Specialty;
import com.centre.poly.specialty.mapper.SpecialtyMapper;
import com.centre.poly.specialty.repositories.DomainRepository;
import com.centre.poly.specialty.repositories.FormationRepository;
import com.centre.poly.specialty.repositories.SpecialtyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecialtyService {

    private final SpecialtyRepository specialtyRepository;
    private final DomainRepository domainRepository;
    private final FormationRepository formationRepository;
    private final SpecialtyMapper specialtyMapper;

    public Integer create(SpecialtyRequest request) {

        Domain domain = domainRepository.findById(request.domainId())
                .orElseThrow(() -> new RuntimeException("DOMAIN_NOT_FOUND"));

        Formation formation = formationRepository.findById(request.formationId())
                .orElseThrow(() -> new RuntimeException("FORMATION_NOT_FOUND"));

        Specialty specialty = specialtyRepository.findByFormationAndDomain(request.formationId(), request.domainId());
        if(specialty == null) {
            return specialtyRepository.save(specialtyMapper.toSpeciality(request)).getId();
        }else{
            throw new DuplicateEntityException("SPECIALTY_ALREADY_EXISTS");
        }
    }

    public PageResponse<SpecialtyResponse> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Specialty> specialties = specialtyRepository.findAll(pageable);
        List<SpecialtyResponse> specialtyResponses = specialties.stream().map(specialtyMapper::toSpecialtyResponse).toList();
        return new PageResponse<>(
                specialtyResponses,
                specialties.getNumber(),
                specialties.getSize(),
                specialties.getTotalElements(),
                specialties.getTotalPages(),
                specialties.isFirst(),
                specialties.isLast()
        );
    }
}
