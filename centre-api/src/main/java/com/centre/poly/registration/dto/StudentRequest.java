package com.centre.poly.registration.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record StudentRequest(
        String firstName,
        String lastName,
        String phoneNumber,
        String email,
        String levelOfEducation
) {
}
