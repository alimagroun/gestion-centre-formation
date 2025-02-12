package com.centre.poly.classmanagement.service;

import com.centre.poly.classmanagement.dto.DomaineRequest;
import com.centre.poly.classmanagement.dto.DomaineResponse;
import com.centre.poly.classmanagement.entity.Domaine;
import com.centre.poly.classmanagement.mapper.DomaineMapper;
import com.centre.poly.classmanagement.repository.DomaineRepository;
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
public class DomaineService {
    
    private final DomaineRepository domaineRepository;
    private final DomaineMapper domaineMapper;
    
    public Long save(DomaineRequest request) {
        
        Domaine exist = domaineRepository.findByName(request.name());
        if (exist != null) {
            throw new DuplicateEntityException("Domaine with name " + request.name() + " already exists");
        }
        
        return domaineRepository.save(domaineMapper.toRequest(request))
                                .getId();
    }
    
    public PageResponse<DomaineResponse> findAllPageable(int page, int size) {
        Pageable pageable = PageRequest.of(page,
                                           size,
                                           Sort.by("createdDate")
                                               .descending());
        Page<Domaine> domainePage = domaineRepository.findAll(pageable);
        List<DomaineResponse> list = domainePage.stream()
                                                .map(domaineMapper::toResponse)
                                                .toList();
        return new PageResponse<>(list,
                                  domainePage.getNumber(),
                                  domainePage.getSize(),
                                  domainePage.getTotalElements(),
                                  domainePage.getTotalPages(),
                                  domainePage.isFirst(),
                                  domainePage.isLast());
    }
    
    public List<DomaineResponse> findAll() {
        return domaineRepository.findAll()
                                .stream()
                                .map(domaineMapper::toResponse)
                                .toList();
    }
}
