package com.centre.poly.gades.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ClassSubjectRequest(
    @NotNull(message = "CLASS_ID_MUST_NOT_BE_NULL") Long classId,
    @NotNull(message = "SUBJECT_ID_MUST_NOT_BE_NULL") Long subjectId,
    @Min(value = 1, message = "SEMESTER_MUST_BE_AT_LEAST_1") int semestre,
    @Min(value = 1, message = "COEFFICIENT_MUST_BE_AT_LEAST_1") int coefficient) {}
