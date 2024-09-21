package com.centre.poly.classmanagement.mapper;

import com.centre.poly.classmanagement.dto.FormationRequest;
import com.centre.poly.classmanagement.dto.FormationResponse;
import com.centre.poly.classmanagement.entity.Formation;
import org.springframework.stereotype.Service;

@Service
public class FormationMapper {

    public Formation toRequest(FormationRequest request){
        Formation formation = new Formation();
        formation.setName(request.name());
        formation.setDescription(request.description());
        return formation;
    }

    public FormationResponse toResponse(Formation formation){
        FormationResponse formationResponse = new FormationResponse();
        formationResponse.setId(formation.getId());
        formationResponse.setName(formation.getName());
        formationResponse.setDescription(formation.getDescription());
        return formationResponse;
    }

}
