package com.centre.poly.classmanagement.mapper;

import com.centre.poly.classmanagement.dto.*;
import com.centre.poly.classmanagement.entity.*;
import com.centre.poly.classmanagement.entity.Class;
import com.centre.poly.schoolYear.SchoolYear;
import org.springframework.stereotype.Service;

@Service
public class ClasseFormationMapper {

    public AccreditedClass toAccreditedClass(AccreditedClassRequest request){
        return AccreditedClass.builder()
                .formation(Formation.builder().id(request.getFormationId()).build())
                .domaine(Domaine.builder().id(request.getDomaineId()).build())
                .schoolYear(SchoolYear.builder().id(request.getSchoolYearId()).build())
                .yearLevel(request.getYearLevel())
                .groupNumber(request.getGroupNumber())
                .build();
    }

    public AcceleratedClass toAcceleratedClass(AcceleratedClassRequest request){
        return AcceleratedClass.builder()
                .formation(Formation.builder().id(request.getFormationId()).build())
                .domaine(Domaine.builder().id(request.getDomaineId()).build())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .groupNumber(request.getGroupNumber())
                .build();
    }

    public AccreditedClassResponse toResponseAccreditedClass(AccreditedClass entity){
        AccreditedClassResponse response = new AccreditedClassResponse();
        response.setId(entity.getId());
        response.setFormationName(entity.getFormation().getName());
        response.setYearLevel(entity.getYearLevel());
        response.setDomaineName(entity.getDomaine().getName());
        response.setSchoolYear(entity.getSchoolYear().getStartYear()+ "-" + entity.getSchoolYear().getEndYear());
        response.setGroupNumber(entity.getGroupNumber());
        return response;
    }

    public AcceleratedClassResponse toResponseAccreditedClass(AcceleratedClass entity){
        AcceleratedClassResponse response = new AcceleratedClassResponse();
        response.setId(entity.getId());
        response.setFormationName(entity.getFormation().getName());
        response.setDomaineName(entity.getDomaine().getName());
        response.setGroupNumber(entity.getGroupNumber());
        response.setStartDate(entity.getStartDate());
        response.setEndDate(entity.getEndDate());
        return response;
    }
}
