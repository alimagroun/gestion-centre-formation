package com.centre.poly.registration.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record StudentRequest(
        @NotNull(message = "STUDENT_FIRST_NAME_REQUIRED")
        @NotEmpty(message = "STUDENT_FIRST_NAME_REQUIRED")
        String firstName,
        
        @NotNull(message = "STUDENT_LAST_NAME_REQUIRED")
        @NotEmpty(message = "STUDENT_LAST_NAME_REQUIRED")
        String lastName,
        
        @NotNull(message = "STUDENT_PHONE_NUMBER_REQUIRED")
        @NotEmpty(message = "STUDENT_PHONE_NUMBER_REQUIRED")
        @Size(min = 8,
              max = 8,
              message = "STUDENT_PHONE_NUMBER_SIZE_MUST_BE_8")
        String phoneNumber,
        
        @Email(message = "STUDENT_EMAIL_NOT_VALID")
        String email,
        
        @NotNull(message = "STUDENT_LEVEL_OF_EDUCATION_REQUIRED")
        @NotEmpty(message = "STUDENT_LEVEL_OF_EDUCATION_REQUIRED")
        String levelOfEducation,
        
        String identityNumber
) {
}
