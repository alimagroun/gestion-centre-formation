package com.centre.poly.registration.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AddressRequest(
        @NotNull(message = "ADDRESS_STREET_REQUIRED")
        @NotEmpty(message = "ADDRESS_STREET_REQUIRED")
        String street,

        @NotNull(message = "ADDRESS_CITY_REQUIRED")
        @NotEmpty(message = "ADDRESS_CITY_REQUIRED")
        String city,

        @NotNull(message = "ADDRESS_ZIP_CODE_REQUIRED")
        @NotEmpty(message = "ADDRESS_ZIP_CODE_REQUIRED")
        @Size(min = 5, max = 5, message = "ADDRESS_ZIP_CODE_SIZE_INVALID")
        String zipCode
) {
}