package com.centre.poly.specialty.mapper;

import com.centre.poly.specialty.dto.FormationRequest;
import com.centre.poly.specialty.dto.FormationResponse;
import com.centre.poly.specialty.entities.Formation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FormationMapper {

    public Formation toFormation(FormationRequest request) {
        return Formation.builder()
                .name(request.name())
                .description(request.description())
                .build();
    }

    public FormationResponse toResponse(Formation formation){
        FormationResponse formationResponse = new FormationResponse();
        formationResponse.setDescription(formation.getDescription());
        formationResponse.setName(formation.getName());

        return formationResponse;
    }
}
