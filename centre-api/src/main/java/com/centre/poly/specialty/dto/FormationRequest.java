package com.centre.poly.specialty.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record FormationRequest(

        @NotEmpty(message = "NAME_REQUIRED")
        @NotBlank(message = "NAME_REQUIRED")
        String name,

        @NotEmpty(message = "DESCRIPTION_REQUIRED")
        @NotBlank(message = "DESCRIPTION_REQUIRED")
        String description
) {
}
