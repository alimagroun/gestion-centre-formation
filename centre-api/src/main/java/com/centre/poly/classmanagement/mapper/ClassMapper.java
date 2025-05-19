package com.centre.poly.classmanagement.mapper;

import com.centre.poly.classmanagement.dto.*;
import com.centre.poly.classmanagement.entity.*;
import com.centre.poly.schoolYear.SchoolYear;
import org.springframework.stereotype.Service;

@Service
public class ClassMapper {

  public AccreditedClassGroup toAccreditedClass(AccreditedClassRequest request) {
    return AccreditedClassGroup.builder()
        .specialty(Specialty.builder().id(request.getSpecialtyId()).build())
        .schoolYear(SchoolYear.builder().id(request.getSchoolYearId()).build())
        .yearLevel(request.getYearLevel())
        .groupNumber(request.getGroupNumber())
        .build();
  }

  public AcceleratedClassGroup toAcceleratedClass(AcceleratedClassRequest request) {
    return AcceleratedClassGroup.builder()
        .specialty(Specialty.builder().id(request.getSpecialtyId()).build())
        .startDate(request.getStartDate())
        .endDate(request.getEndDate())
        .groupNumber(request.getGroupNumber())
        .build();
  }

  public AccreditedClassResponse toResponseAccreditedClass(AccreditedClassGroup entity) {
    AccreditedClassResponse response = new AccreditedClassResponse();
    response.setId(entity.getId());
    response.setSpecialtyName(
        entity.getSpecialty().getFormationType().getName()
            + " "
            + entity.getSpecialty().getDomaine().getName());
    response.setYearLevel(entity.getYearLevel());
    response.setSchoolYear(
        entity.getSchoolYear().getStartYear() + "-" + entity.getSchoolYear().getEndYear());
    response.setGroupNumber(entity.getGroupNumber());
    return response;
  }

  public AcceleratedClassResponse toResponseAccelerated(AcceleratedClassGroup entity) {
    AcceleratedClassResponse response = new AcceleratedClassResponse();
    response.setId(entity.getId());
    response.setSpecialtyName(
        entity.getSpecialty().getFormationType().getName()
            + " "
            + entity.getSpecialty().getDomaine().getName());
    response.setGroupNumber(entity.getGroupNumber());
    response.setStartDate(entity.getStartDate());
    response.setEndDate(entity.getEndDate());
    return response;
  }

  public ClassStudentResponse toClassStudentResponse(AcceleratedClassEntry entry) {
    ClassStudentResponse response = new ClassStudentResponse();
    response.setStudentId(entry.getStudent().getId());
    response.setFirstName(entry.getStudent().getFirstName());
    response.setLastName(entry.getStudent().getLastName());
    response.setStudentPhoneNumber(entry.getStudent().getPhoneNumber());
    response.setMotherPhoneNumber(entry.getStudent().getMother().getPhoneNumber());
    response.setFatherPhoneNumber(entry.getStudent().getFather().getPhoneNumber());
    return response;
  }

  public ClassStudentResponse toClassStudentResponse(AccreditedClassEntry entry) {
    ClassStudentResponse response = new ClassStudentResponse();
    response.setStudentId(entry.getStudent().getId());
    response.setFirstName(entry.getStudent().getFirstName());
    response.setLastName(entry.getStudent().getLastName());
    response.setStudentPhoneNumber(entry.getStudent().getPhoneNumber());
    response.setMotherPhoneNumber(
        entry.getStudent().getMother() != null
            ? entry.getStudent().getMother().getPhoneNumber()
            : null);
    response.setFatherPhoneNumber(
        entry.getStudent().getFather() != null
            ? entry.getStudent().getFather().getPhoneNumber()
            : null);
    return response;
  }
}
