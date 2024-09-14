package com.centre.poly.registration.dto;

import jakarta.validation.Valid;

import java.util.List;

public record RegistrationRequest(
        @Valid
        ParentRequest parentRequest,
        @Valid
        StudentRequest studentRequest,
        @Valid
        AddressRequest addressRequest,
        String remarks,
        List<Long> documents
) {
}
