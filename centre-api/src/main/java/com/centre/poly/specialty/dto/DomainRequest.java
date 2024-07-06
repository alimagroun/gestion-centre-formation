package com.centre.poly.specialty.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record DomainRequest(

        @NotEmpty(message = "NAME_REQUIRED")
        @NotBlank(message = "NAME_REQUIRED")
        String name,

        @NotEmpty(message = "DESCRIPTION_REQUIRED")
        @NotBlank(message = "DESCRIPTION_REQUIRED")
        String description
) {
}
