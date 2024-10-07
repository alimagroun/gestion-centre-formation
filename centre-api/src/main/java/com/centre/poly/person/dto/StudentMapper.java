package com.centre.poly.person.dto;

import com.centre.poly.person.entity.Student;
import com.centre.poly.registration.dto.StudentRequest;
import org.springframework.stereotype.Service;

@Service
public class StudentMapper {

    public Student toStudent(StudentRequest request) {
        Student student = new Student();
        student.setFirstName(request.firstName());
        student.setLastName(request.lastName());
        student.setPhoneNumber(request.phoneNumber());
        student.setEmail(request.email());
        student.setLevelOfEducation(request.levelOfEducation());

        return student;

    }

    public StudentResponse toResponse(Student student) {
        StudentResponse response = new StudentResponse();
        response.setId(student.getId());
        response.setFirstName(student.getFirstName());
        response.setLastName(student.getLastName());
        response.setPhoneNumber(student.getPhoneNumber());
        response.setLevelOfEducation(student.getLevelOfEducation());
        return response;
    }
}
