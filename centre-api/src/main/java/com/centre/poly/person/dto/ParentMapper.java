package com.centre.poly.person.dto;

import com.centre.poly.person.entity.Parent;
import com.centre.poly.person.entity.Person;
import com.centre.poly.registration.dto.ParentRequest;
import org.springframework.stereotype.Service;

@Service
public class ParentMapper {
    
    private final StudentMapper studentMapper;
    
    public ParentMapper(StudentMapper studentMapper) {
        this.studentMapper = studentMapper;
    }
    
    public Parent toParent(ParentRequest parentRequest) {
        Parent parent = new Parent();
        parent.setId(parent.getId());
        parent.setFirstName(parentRequest.firstName());
        parent.setLastName(parentRequest.lastName());
        parent.setPhoneNumber(parentRequest.phoneNumber());
        parent.setEmail(parentRequest.email());
        parent.setProfession(parentRequest.profession());
        parent.setType(parentRequest.type());
        parent.setIsDeceased(parentRequest.isDeceased());
        parent.setMaritalStatus(parentRequest.maritalStatus());
        
        return parent;
    }
    
    public ParentResponse toResponse(Person person) {
        ParentResponse response = new ParentResponse();
        response.setId(person.getId());
        response.setFirstName(person.getFirstName());
        response.setLastName(person.getLastName());
        response.setPhoneNumber(person.getPhoneNumber());
        response.setEmail(person.getEmail());
        return response;
    }
    
    public ParentDetailResponse toDetailResponse(Parent parent) {
        ParentDetailResponse response = new ParentDetailResponse();
        response.setId(parent.getId());
        response.setFirstName(parent.getFirstName());
        response.setLastName(parent.getLastName());
        response.setPhoneNumber(parent.getPhoneNumber());
        response.setEmail(parent.getEmail());
        response.setProfession(parent.getProfession());
        response.setIsDeceased(parent.getIsDeceased());
        response.setMaritalStatus(parent.getMaritalStatus());
        response.setStudents(parent.getStudents()
                                   .stream()
                                   .map(studentMapper::toResponse)
                                   .toList());
        return response;
    }
}
