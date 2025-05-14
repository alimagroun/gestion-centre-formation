package com.centre.poly.user.mapper;

import com.centre.poly.person.entity.*;
import com.centre.poly.user.dto.PersonResponse;
import com.centre.poly.user.dto.UserResponse;
import com.centre.poly.user.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

  public UserResponse toResponse(User user) {
    return UserResponse.builder()
        .id(user.getId())
        .userName(user.getUsername())
        .createdDate(user.getCreatedDate())
        .person(toPerson(user.getPerson()))
        .roles(user.getRoles())
        .build();
  }

  public PersonResponse toPerson(Person person) {
    return PersonResponse.builder()
        .id(person.getId())
        .firstName(person.getFirstName())
        .lastName(person.getLastName())
        .type(getTypePerson(person))
        .build();
  }

  private String getTypePerson(Person person) {
    String type = null;
    if (person instanceof Student) {
      type = "STUDENT";
    } else if (person instanceof Parent) {
      type = "PARENT";
    } else if (person instanceof Teacher) {
      type = "PROF";
    } else {
      type = "Inconnue";
    }
    return type;
  }
}
