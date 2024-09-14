package com.centre.poly.registration.dto;

import jakarta.validation.Valid;

import java.util.List;

public record RegistrationRequest(
        ParentRequest parentRequest,
        StudentRequest studentRequest,
        AddressRequest addressRequest,
        String remarks,
        List<Long> documents
) {
}
