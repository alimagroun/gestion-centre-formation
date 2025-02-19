package com.centre.poly.person.dto;

import com.centre.poly.person.entity.TeacherStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TeacherRequest(
    @NotBlank(message = "FIRST_NAME_IS_REQUIRED") @NotNull(message = "FIRST_NAME_IS_REQUIRED")
        String firstName,
    @NotBlank(message = "LAST_NAME_IS_REQUIRED") @NotNull(message = "LAST_NAME_IS_REQUIRED")
        String lastName,
    @NotBlank(message = "PHONE_NUMBER_IS_REQUIRED") @NotNull(message = "PHONE_NUMBER_IS_REQUIRED")
        String phoneNumber,
    @Email(message = "INVALID_EMAIL_FORMAT") String email,
    @Valid AddressRequest address,
    @NotBlank(message = "SPECIALITY_IS_REQUIRED") @NotNull(message = "SPECIALITY_IS_REQUIRED")
        String speciality,
    @NotBlank(message = "DIPLOMAS_OBTAINED_ARE_REQUIRED")
        @NotNull(message = "DIPLOMAS_OBTAINED_ARE_REQUIRED")
        String diplomasObtained,
    @NotNull(message = "TEACHER_STATUS_IS_REQUIRED") TeacherStatus teacherStatus) {}
