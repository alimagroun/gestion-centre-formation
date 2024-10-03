package com.centre.poly.classmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccreditedClassResponse {

    private Long id;
    private String specialtyName;
    private String schoolYear;
    private int yearLevel;
    private int groupNumber;
}
