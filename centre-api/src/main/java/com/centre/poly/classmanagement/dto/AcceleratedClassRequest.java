package com.centre.poly.classmanagement.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcceleratedClassRequest {

    @NotNull(message = "FORMATION_ID_NOT_NULL")
    private Long formationId;

    @NotNull(message = "DOMAINE_ID_NOT_NULL")
    private Long domaineId;

    @Min(value = 1, message = "GROUP_NUMBER_MIN_1")
    private int groupNumber;

    @NotNull(message = "START_DATE_NOT_NULL")
    private LocalDate startDate;

    @NotNull(message = "END_DATE_NOT_NULL")
    private LocalDate endDate;

}
