package com.centre.poly.registration.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record RegistrationRequest(
        @Valid
        ParentRequest motherRequest,

        @Valid
        ParentRequest fatherRequest,

        @Valid
        StudentRequest studentRequest,
        @Valid
        AddressRequest addressRequest,

        @NotNull(message = "REGISTRATION_FEES_NOT_NULL")
        Double registrationFees,

        @NotNull(message = "SPECIALTY_ID_NOT_NULL")
        Long specialtyId,

        String remarks,
        List<Long> documents
) {
}
