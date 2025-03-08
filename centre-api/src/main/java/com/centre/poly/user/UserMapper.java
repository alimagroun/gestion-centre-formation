package com.centre.poly.user;

import com.centre.poly.person.entity.Parent;
import com.centre.poly.person.entity.Person;
import com.centre.poly.person.entity.Student;
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

  private PersonResponse toPerson(Person person) {
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
    } else {
      type = "ADMIN";
    }
    return type;
  }
}
