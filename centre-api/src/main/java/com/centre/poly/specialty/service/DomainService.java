package com.centre.poly.specialty.service;

import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.specialty.dto.DomainRequest;
import com.centre.poly.specialty.dto.DomainResponse;
import com.centre.poly.specialty.dto.FormationResponse;
import com.centre.poly.specialty.entities.Domain;
import com.centre.poly.specialty.entities.Formation;
import com.centre.poly.specialty.mapper.DomainMapper;
import com.centre.poly.specialty.repositories.DomainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DomainService {

    private final DomainRepository domainRepository;
    private final DomainMapper domainMapper;

    public Integer createDomain(DomainRequest request) {

        Domain domain = domainRepository.findByName(request.name());

        if(domain != null) {
            throw new DuplicateEntityException("DOMAIN_ALREADY_EXISTS");
        }

        return domainRepository.save(domainMapper.toDomain(request)).getId();
    }

    public PageResponse<DomainResponse> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Domain> domains = domainRepository.findAll(pageable);
        List<DomainResponse> domainResponses = domains.stream().map(domainMapper::toResponse).toList();
        return new PageResponse<>(
                domainResponses,
                domains.getNumber(),
                domains.getSize(),
                domains.getTotalElements(),
                domains.getTotalPages(),
                domains.isFirst(),
                domains.isLast()
        );
    }
}
