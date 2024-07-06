package com.centre.poly.specialty.mapper;

import com.centre.poly.specialty.dto.DomainRequest;
import com.centre.poly.specialty.dto.DomainResponse;
import com.centre.poly.specialty.dto.FormationRequest;
import com.centre.poly.specialty.dto.FormationResponse;
import com.centre.poly.specialty.entities.Domain;
import com.centre.poly.specialty.entities.Formation;
import org.springframework.stereotype.Service;

@Service
public class DomainMapper {

    public Domain toDomain(DomainRequest request) {
        return Domain.builder()
                .name(request.name())
                .description(request.description())
                .build();
    }

    public DomainResponse toResponse(Domain domain){
        DomainResponse domainResponse = new DomainResponse();
        domainResponse.setDescription(domain.getDescription());
        domainResponse.setName(domain.getName());

        return domainResponse;
    }
}
