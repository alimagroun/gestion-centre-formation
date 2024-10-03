package com.centre.poly.classmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccreditedClassRequest {

    @NotNull(message = "SPECIALTY_ID_NOT_NULL")
    private Long specialtyId;

    @NotNull(message = "SCHOOL_YEAR_ID_NOT_NULL")
    private Long schoolYearId;

    @Min(value = 1, message = "GROUP_NUMBER_MIN_1")
    private int groupNumber;

    @Min(value = 1, message = "YEAR_LEVEL_MIN_1")
    private int yearLevel;
}
