package com.centre.poly.classmanagement.service;

import com.centre.poly.classmanagement.dto.SpecialtyRequest;
import com.centre.poly.classmanagement.dto.SpecialtyResponse;
import com.centre.poly.classmanagement.entity.Domaine;
import com.centre.poly.classmanagement.entity.FormationType;
import com.centre.poly.classmanagement.entity.Specialty;
import com.centre.poly.classmanagement.mapper.SpecialtyMapper;
import com.centre.poly.classmanagement.repository.DomaineRepository;
import com.centre.poly.classmanagement.repository.FormationTypeRepository;
import com.centre.poly.classmanagement.repository.SpecialtyRepository;
import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SpecialtyService {

    private final DomaineRepository domaineRepository;
    private final FormationTypeRepository formationTypeRepository;
    private final SpecialtyRepository specialtyRepository;
    private final SpecialtyMapper specialtyMapper;

    public Long save(SpecialtyRequest request){

        Domaine domaine = domaineRepository.findById(request.domaineId())
                .orElseThrow(() -> new NotFoundException("Domaine not found"));
        FormationType formationType = formationTypeRepository.findById(request.formationTypeId())
                .orElseThrow(() -> new NotFoundException("Formation Type not found"));

        Optional<Specialty> existingSpecialty = specialtyRepository.findByDomaineAndFormationType(domaine, formationType);
        if (existingSpecialty.isPresent()) {
            throw new DuplicateEntityException("Specialty with this domain and formation type already exists.");
        }

        return specialtyRepository.save(specialtyMapper.toRequest(request)).getId();
    }

    public PageResponse<SpecialtyResponse> findAllPageable(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Specialty> specialtyPage = specialtyRepository.findAll(pageable);
        List<SpecialtyResponse> specialtyResponseList = specialtyPage.stream().map(specialtyMapper::toResponse).toList();
        return new PageResponse<>(specialtyResponseList, specialtyPage.getNumber(), specialtyPage.getSize(), specialtyPage.getTotalElements(), specialtyPage.getTotalPages(), specialtyPage.isFirst(), specialtyPage.isLast());

    }

    public List<SpecialtyResponse> findAll() {
        return specialtyRepository.findAll().stream().map(specialtyMapper::toResponse).toList();
    }
}
