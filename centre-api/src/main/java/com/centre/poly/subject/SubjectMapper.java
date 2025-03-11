package com.centre.poly.subject;

import com.centre.poly.classmanagement.entity.Specialty;
import java.io.IOException;
import org.springframework.stereotype.Service;

@Service
public class SubjectMapper {

  public Subject toSubject(SubjectRequest request) throws IOException {
    Subject subject = new Subject();
    subject.setName(request.name().trim());
    subject.setDescription(request.description());
    subject.setTotalHours(request.totalHours());
    subject.setTheoreticalHours(request.theoreticalHours());
    subject.setPracticalHours(request.practicalHours());
    subject.setSpecialty(Specialty.builder().id(request.specialtyId()).build());
    return subject;
  }

  public SubjectResponse toSubjectResponse(Subject subject) {
    SubjectResponse response = new SubjectResponse();
    response.setId(subject.getId());
    response.setName(subject.getName());
    response.setDescription(subject.getDescription());
    response.setPdfFile(subject.getPdfFile().length != 0);
    return response;
  }
}
