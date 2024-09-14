package com.centre.poly.registration.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AddressRequest(
        String street,
        String city,
        String zipCode
) {
}