package com.centre.poly.classroom;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ClassroomRequest(
    @NotNull(message = "CLASSROOM_NAME_MUST_NOT_BE_NULL")
        @NotBlank(message = "CLASSROOM_NAME_MUST_NOT_BE_NULL")
        String name,
    @NotNull(message = "CLASSROOM_TYPE_MUST_NOT_BE_NULL") ClassroomType type) {}
