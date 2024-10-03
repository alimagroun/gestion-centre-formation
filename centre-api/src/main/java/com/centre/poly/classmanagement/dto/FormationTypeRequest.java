package com.centre.poly.classmanagement.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record FormationTypeRequest(
        @NotNull(message = "NAME_NOT_NULL")
        @NotEmpty(message = "NAME_NOT_NULL")
        String name,

        @NotNull(message = "DESCRIPTION_NOT_NULL")
        @NotEmpty(message = "DESCRIPTION_NOT_NULL")
        String description
) {
}
