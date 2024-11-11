package com.centre.poly.person.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentAllResponse {
    Long id;
    String firstName;
    String lastName;
    String fullName;
}
