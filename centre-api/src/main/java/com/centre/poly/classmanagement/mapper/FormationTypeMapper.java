package com.centre.poly.classmanagement.mapper;

import com.centre.poly.classmanagement.dto.FormationTypeRequest;
import com.centre.poly.classmanagement.dto.FormationTypeResponse;
import com.centre.poly.classmanagement.entity.FormationType;
import org.springframework.stereotype.Service;

@Service
public class FormationTypeMapper {
    
    public FormationType toRequest(FormationTypeRequest request) {
        FormationType formationType = new FormationType();
        formationType.setName(request.name());
        formationType.setDescription(request.description());
        return formationType;
    }
    
    public FormationTypeResponse toResponse(FormationType formationType) {
        FormationTypeResponse formationTypeResponse = new FormationTypeResponse();
        formationTypeResponse.setId(formationType.getId());
        formationTypeResponse.setName(formationType.getName());
        formationTypeResponse.setDescription(formationType.getDescription());
        return formationTypeResponse;
    }
    
}
