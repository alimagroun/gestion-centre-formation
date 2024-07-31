package com.centre.poly.person.dto;

import java.util.List;

public record RegistrationRequest(
        ParentRequest parentRequest,
        StudentRequest studentRequest,
        AddressRequest addressRequest,
        List<Integer> documentIDs
) {
}
