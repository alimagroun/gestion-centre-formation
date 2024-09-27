package com.centre.poly.classmanagement.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClasseFormationResponse {

    private Long id;
    private String formationName;
    private String domaineName;
    private String schoolYear;
    private int yearLevel;
    private int groupNumber;
}
