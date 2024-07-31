package com.centre.poly.person.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParentResponse {

    Integer id;
    String firstName;
    String lastName;
    String phoneNumber;
    String email;
    String profession;
}
