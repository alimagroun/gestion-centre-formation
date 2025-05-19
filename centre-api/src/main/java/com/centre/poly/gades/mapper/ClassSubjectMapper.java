package com.centre.poly.gades.mapper;

import com.centre.poly.classmanagement.entity.ClassGroup;
import com.centre.poly.gades.dto.ClassSubjectRequest;
import com.centre.poly.gades.dto.ClassSubjectResponse;
import com.centre.poly.gades.entity.ClassSubject;
import com.centre.poly.subject.Subject;
import org.springframework.stereotype.Service;

@Service
public class ClassSubjectMapper {

  public ClassSubject toEntity(
      ClassSubjectRequest request, ClassGroup classGroupEntity, Subject subject) {
    return ClassSubject.builder()
        .classGroupEntity(classGroupEntity)
        .subject(subject)
        .semester(request.semestre())
        .coefficient(request.coefficient())
        .build();
  }

  public ClassSubjectResponse toResponse(ClassSubject classSubject) {
    ClassSubjectResponse response = new ClassSubjectResponse();
    response.setSubjectName(classSubject.getSubject().getName());
    response.setSemester(classSubject.getSemester());
    response.setCoefficient(classSubject.getCoefficient());
    return response;
  }
}
