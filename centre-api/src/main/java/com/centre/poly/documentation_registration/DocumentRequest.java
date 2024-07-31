package com.centre.poly.documentation_registration;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DocumentRequest(

        @NotNull(message = "DOCUMENT_NAME_REQUIRED")
        @NotBlank(message = "DOCUMENT_NAME_REQUIRED")
        String name,

        @NotNull(message = "DOCUMENT_DESCRIPTION_REQUIRED")
        @NotBlank(message = "DOCUMENT_DESCRIPTION_REQUIRED")
        String description
) {
}
