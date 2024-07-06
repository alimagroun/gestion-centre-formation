package com.centre.poly.specialty.mapper;

import com.centre.poly.specialty.dto.SpecialtyRequest;
import com.centre.poly.specialty.dto.SpecialtyResponse;
import com.centre.poly.specialty.entities.Domain;
import com.centre.poly.specialty.entities.Formation;
import com.centre.poly.specialty.entities.Specialty;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SpecialtyMapper {

    private final FormationMapper formationMapper;
    private final DomainMapper domainMapper;

    public Specialty toSpeciality(SpecialtyRequest request){
        Specialty specialty = new Specialty();

        specialty.setFormation(Formation.builder().id(request.formationId()).build());
        specialty.setDomain(Domain.builder().id(request.domainId()).build());

        return specialty;
    }

    public SpecialtyResponse toSpecialtyResponse(Specialty specialty){
        SpecialtyResponse specialtyResponse = new SpecialtyResponse();

        specialtyResponse.setFormation(formationMapper.toResponse(specialty.getFormation()));
        specialtyResponse.setDomain(domainMapper.toResponse(specialty.getDomain()));

        return specialtyResponse;
    }
}
