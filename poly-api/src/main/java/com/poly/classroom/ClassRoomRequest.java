package com.poly.classroom;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ClassRoomRequest(
        @NotNull(message = "NAME_REQUIRED")
        @NotEmpty(message = "NAME_REQUIRED")
        String name,

        @NotNull(message = "TYPE_REQUIRED")
        @NotEmpty(message = "TYPE_REQUIRED")
        String type
) {
}
