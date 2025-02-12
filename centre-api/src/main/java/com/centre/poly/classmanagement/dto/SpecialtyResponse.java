package com.centre.poly.classmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecialtyResponse {
    
    private Long id;
    private String domaineName;
    private String formationTypeName;
}
