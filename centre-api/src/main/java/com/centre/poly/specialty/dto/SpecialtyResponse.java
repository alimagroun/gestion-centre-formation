package com.centre.poly.specialty.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SpecialtyResponse {

    FormationResponse formation;
    DomainResponse domain;
}