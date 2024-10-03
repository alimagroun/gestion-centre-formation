package com.centre.poly.classmanagement.service;

import com.centre.poly.classmanagement.dto.FormationTypeRequest;
import com.centre.poly.classmanagement.dto.FormationTypeResponse;
import com.centre.poly.classmanagement.entity.FormationType;
import com.centre.poly.classmanagement.mapper.FormationTypeMapper;
import com.centre.poly.classmanagement.repository.FormationTypeRepository;
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
public class FormationTypeService {

    private final FormationTypeRepository formationTypeRepository;
    private final FormationTypeMapper formationTypeMapper;

    public Long save(FormationTypeRequest request){

        FormationType exist  = formationTypeRepository.findByNameIgnoreCase(request.name());
        if(exist != null){
            throw new DuplicateEntityException("Formation type with name " + request.name() + " already exists");
        }

        return formationTypeRepository.save(formationTypeMapper.toRequest(request)).getId();
    }

    public PageResponse<FormationTypeResponse> findAllPageabale(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<FormationType> formationPage = formationTypeRepository.findAll(pageable);
        List<FormationTypeResponse> list = formationPage.stream().map(formationTypeMapper::toResponse).toList();
        return new PageResponse<>(list, formationPage.getNumber(), formationPage.getSize(), formationPage.getTotalElements(), formationPage.getTotalPages(), formationPage.isFirst(), formationPage.isLast());
    }

    public List<FormationTypeResponse> findAll(){
        return this.formationTypeRepository.findAll().stream().map(formationTypeMapper::toResponse).toList();
    }
}
