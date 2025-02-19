package com.centre.poly.person.mapper;

import com.centre.poly.person.dto.TeacherRequest;
import com.centre.poly.person.dto.TeacherResponse;
import com.centre.poly.person.entity.Teacher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeacherMapper {

  private final AddressMapper addressMapper;

  public Teacher toTeacher(TeacherRequest request) {

    if (request == null) {
      return null;
    }

    Teacher teacher = new Teacher();
    teacher.setFirstName(request.firstName());
    teacher.setLastName(request.lastName());
    teacher.setPhoneNumber(request.phoneNumber());
    teacher.setEmail(request.email());
    teacher.setAddress(addressMapper.ToAddress(request.address()));
    teacher.setSpeciality(request.speciality());
    teacher.setDiplomasObtained(request.diplomasObtained());
    teacher.setTeacherStatus(request.teacherStatus());

    return teacher;
  }

  public TeacherResponse toTeacherResponse(Teacher teacher) {
    if (teacher == null) {
      return null;
    }
    TeacherResponse response = new TeacherResponse();
    response.setId(teacher.getId());
    response.setFullName(teacher.getFirstName() + " " + teacher.getLastName());
    response.setSpeciality(teacher.getSpeciality());
    response.setTeacherStatus(teacher.getTeacherStatus().toString());
    return response;
  }
}
