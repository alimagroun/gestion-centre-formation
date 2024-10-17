package com.centre.poly.person.dto;

import com.centre.poly.person.entity.Address;
import com.centre.poly.person.entity.Parent;
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

    public StudentDetailsResponse toDetailsResponse(Student student) {
        StudentDetailsResponse response = new StudentDetailsResponse();
        response.setId(student.getId());
        response.setFirstName(student.getFirstName());
        response.setLastName(student.getLastName());
        response.setPhoneNumber(student.getPhoneNumber());
        response.setEmail(student.getEmail());
        response.setLevelOfEducation(student.getLevelOfEducation());

        response.setAddress(toAddressDTO(student.getAddress()));
        response.setMother(toParentDTO(student.getMother()));
        response.setFather(toParentDTO(student.getFather()));

        response.setParentStatus(toParentStatusDTO(student.getMother(), student.getFather()));
        return response;
    }

    private ParentDTO toParentDTO(Parent p) {
        ParentDTO parentDTO = new ParentDTO();
        parentDTO.setId(p.getId());
        parentDTO.setFirstName(p.getFirstName());
        parentDTO.setLastName(p.getLastName());
        parentDTO.setPhoneNumber(p.getPhoneNumber());
        parentDTO.setEmail(p.getEmail());
        parentDTO.setProfession(p.getProfession());
        return parentDTO;
    }

    private AddressDTO toAddressDTO(Address a) {
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setCity(a.getCity());
        addressDTO.setStreet(a.getStreet());
        addressDTO.setZipCode(a.getZipCode());
        return addressDTO;
    }

    private ParentStatusDTO toParentStatusDTO(Parent m, Parent f) {
        ParentStatusDTO parentStatusDTO = new ParentStatusDTO();
        parentStatusDTO.setMaritalStatus(m.getMaritalStatus());
        parentStatusDTO.setIsMatherDeceased(m.getIsDeceased());
        parentStatusDTO.setIsFatherDeceased(f.getIsDeceased());
        return parentStatusDTO;
    }
}
