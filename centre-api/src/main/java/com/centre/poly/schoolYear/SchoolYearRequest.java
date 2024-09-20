package com.centre.poly.schoolYear;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record SchoolYearRequest(
        @NotNull(message = "START_YEAR_NOT_NULL")
        @Min(value = 1, message = "START_YEAR_NOT_ZERO")
        Integer startYear,

        @NotNull(message = "END_YEAR_NOT_NULL")
        @Min(value = 1, message = "END_YEAR_NOT_ZERO")
        Integer endYear) {
}

