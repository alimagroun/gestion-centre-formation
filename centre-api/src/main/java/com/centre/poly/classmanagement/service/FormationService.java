package com.centre.poly.classmanagement.service;

import com.centre.poly.classmanagement.dto.FormationRequest;
import com.centre.poly.classmanagement.dto.FormationResponse;
import com.centre.poly.classmanagement.entity.Formation;
import com.centre.poly.classmanagement.mapper.FormationMapper;
import com.centre.poly.classmanagement.repository.FormationRepository;
import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FormationService {

    private final FormationRepository formationRepository;
    private final FormationMapper formationMapper;

    public Long save(FormationRequest request){

        Formation exist  = formationRepository.findByName(request.name());
        if(exist != null){
            throw new DuplicateEntityException("Formation with name " + request.name() + " already exists");
        }

        return formationRepository.save(formationMapper.toRequest(request)).getId();
    }

    public PageResponse<FormationResponse> findAll(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Formation> formationPage = formationRepository.findAll(pageable);
        List<FormationResponse> list = formationPage.stream().map(formationMapper::toResponse).toList();
        return new PageResponse<>(list, formationPage.getNumber(), formationPage.getSize(), formationPage.getTotalElements(), formationPage.getTotalPages(), formationPage.isFirst(), formationPage.isLast());
    }
}
