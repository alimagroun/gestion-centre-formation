package com.centre.poly.classmanagement.mapper;

import com.centre.poly.classmanagement.dto.ClasseFormationRequest;
import com.centre.poly.classmanagement.dto.ClasseFormationResponse;
import com.centre.poly.classmanagement.entity.ClasseFormation;
import com.centre.poly.classmanagement.entity.Domaine;
import com.centre.poly.classmanagement.entity.Formation;
import com.centre.poly.schoolYear.SchoolYear;
import org.springframework.stereotype.Service;

@Service
public class ClasseFormationMapper {

    public ClasseFormation toEntity(ClasseFormationRequest request){
        return ClasseFormation.builder()
                .formation(Formation.builder().id(request.getFormationId()).build())
                .domaine(Domaine.builder().id(request.getDomaineId()).build())
                .schoolYear(SchoolYear.builder().id(request.getSchoolYearId()).build())
                .yearLevel(request.getYearLevel())
                .groupNumber(request.getGroupNumber())
                .build();
    }

    public ClasseFormationResponse toResponse(ClasseFormation entity){
        ClasseFormationResponse response = new ClasseFormationResponse();
        response.setId(entity.getId());
        response.setFormationName(entity.getFormation().getName());
        response.setYearLevel(entity.getYearLevel());
        response.setDomaineName(entity.getDomaine().getName());
        response.setSchoolYear(entity.getSchoolYear().getStartYear()+ "-" + entity.getSchoolYear().getEndYear());
        response.setGroupNumber(entity.getGroupNumber());
        return response;
    }
}
