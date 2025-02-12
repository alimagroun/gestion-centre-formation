package com.centre.poly.classmanagement.dto;

import jakarta.validation.constraints.NotNull;

public record SpecialtyRequest(
        
        @NotNull(message = "DOMAINE_NOT_NULL")
        Long domaineId,
        
        @NotNull(message = "FORMATION_TYPE_NOT_NULL")
        Long formationTypeId) {
}
