package com.centre.poly.specialty.service;

import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.specialty.dto.FormationRequest;
import com.centre.poly.specialty.dto.FormationResponse;
import com.centre.poly.specialty.entities.Formation;
import com.centre.poly.specialty.mapper.FormationMapper;
import com.centre.poly.specialty.repositories.FormationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FormationService {


    private final FormationRepository formationRepository;
    private final FormationMapper formationMapper;

    public FormationService(FormationRepository formationRepository, FormationMapper formationMapper) {
        this.formationRepository = formationRepository;
        this.formationMapper = formationMapper;
    }

    public Integer createFormation(FormationRequest request) {

        Formation formation =  formationRepository.findByName(request.name());
        if (formation != null) {
            throw new DuplicateEntityException("FORMATION_ALREADY_EXISTS");
        }

        return formationRepository.save(formationMapper.toFormation(request)).getId();
    }

    public PageResponse<FormationResponse> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Formation> formations = formationRepository.findAll(pageable);
        List<FormationResponse> formationResponses = formations.stream().map(formationMapper::toResponse).toList();
        return new PageResponse<>(
                formationResponses,
                formations.getNumber(),
                formations.getSize(),
                formations.getTotalElements(),
                formations.getTotalPages(),
                formations.isFirst(),
                formations.isLast()
        );
    }
}
