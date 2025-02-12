package com.centre.poly.classmanagement.mapper;

import com.centre.poly.classmanagement.dto.SpecialtyRequest;
import com.centre.poly.classmanagement.dto.SpecialtyResponse;
import com.centre.poly.classmanagement.entity.Domaine;
import com.centre.poly.classmanagement.entity.FormationType;
import com.centre.poly.classmanagement.entity.Specialty;
import org.springframework.stereotype.Service;

@Service
public class SpecialtyMapper {
    
    public Specialty toRequest(SpecialtyRequest request) {
        return Specialty.builder()
                        .domaine(Domaine.builder()
                                        .id(request.domaineId())
                                        .build())
                        .formationType(FormationType.builder()
                                                    .id(request.formationTypeId())
                                                    .build())
                        .build();
    }
    
    public SpecialtyResponse toResponse(Specialty specialty) {
        SpecialtyResponse response = new SpecialtyResponse();
        response.setId(specialty.getId());
        response.setDomaineName(specialty.getDomaine()
                                         .getName());
        response.setFormationTypeName(specialty.getFormationType()
                                               .getName());
        return response;
    }
}
