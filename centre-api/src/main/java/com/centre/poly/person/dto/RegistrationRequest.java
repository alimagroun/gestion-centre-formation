package com.centre.poly.person.dto;

public record RegistrationRequest(
        ParentRequest parentRequest,
        StudentRequest studentRequest,
        AddressRequest addressRequest
) {
}
