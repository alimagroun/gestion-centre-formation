package com.centre.poly.classmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassStudentResponse {
    Long studentId;
    String firstName;
    String lastName;
    String phoneNumber;
    String className;
}
