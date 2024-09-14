package com.centre.poly.registration.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ParentRequest(Integer id,

                            @NotNull(message = "PARENT_FIRST_NAME_REQUIRED")
                            @NotEmpty(message = "PARENT_FIRST_NAME_REQUIRED")
                            String firstName,

                            @NotNull(message = "PARENT_LAST_NAME_REQUIRED")
                            @NotEmpty(message = "PARENT_LAST_NAME_REQUIRED")
                            String lastName,

                            @NotNull(message = "PARENT_PHONE_NUMBER_REQUIRED")
                            @NotEmpty(message = "PARENT_PHONE_NUMBER_REQUIRED")
                            @Size(min = 8, max = 8, message = "PARENT_PHONE_NUMBER_SIZE_MUST_BE_8")
                            String phoneNumber,

                            @Email(message = "PARENT_EMAIL_NOT_VALID")
                            String email,

                            String profession) {
}
