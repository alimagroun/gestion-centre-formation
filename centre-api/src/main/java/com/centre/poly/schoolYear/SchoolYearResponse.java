package com.centre.poly.schoolYear;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SchoolYearResponse {

    private Long id;

    private Integer start_year;

    private Integer end_year;

    private Boolean isDefault;
}
