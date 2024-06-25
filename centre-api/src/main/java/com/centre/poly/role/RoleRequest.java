package com.centre.poly.role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record RoleRequest(

        @NotEmpty(message = "ROLE_NAME_REQUIRED")
        @NotBlank(message = "ROLE_NAME_REQUIRED")
        String name
) {
}
