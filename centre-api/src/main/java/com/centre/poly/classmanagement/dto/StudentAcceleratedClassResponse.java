package com.centre.poly.classmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentAcceleratedClassResponse {

    Long id;
    String firstNameStudent;
    String lastNameStudent;
}
