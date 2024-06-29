package com.centre.poly.person.dto;

import com.centre.poly.person.model.Parent;
import org.springframework.stereotype.Service;

@Service
public class ParentMapper {

    public Parent toParent(ParentRequest parentRequest){
        Parent parent = new Parent();
        parent.setId(parent.getId());
        parent.setFirstName(parentRequest.firstName());
        parent.setLastName(parentRequest.lastName());
        parent.setPhoneNumber(parentRequest.phoneNumber());
        parent.setEmail(parentRequest.email());
        parent.setProfession(parentRequest.profession());

        return parent;
    }
}
