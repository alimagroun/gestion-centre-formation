package com.centre.poly.classmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcceleratedClassResponse {

    private Long id;
    private String specialtyName;
    private int groupNumber;
    private LocalDate startDate;
    private LocalDate endDate;

}
