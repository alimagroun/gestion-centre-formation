package com.centre.poly.person.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AddressRequest(
    @NotNull(message = "ADDRESS_STREET_REQUIRED") @NotEmpty(message = "ADDRESS_STREET_REQUIRED")
        String street,
    @NotNull(message = "ADDRESS_CITY_REQUIRED") @NotEmpty(message = "ADDRESS_CITY_REQUIRED")
        String city,
    @NotNull(message = "ADDRESS_ZIP_CODE_REQUIRED") @NotEmpty(message = "ADDRESS_ZIP_CODE_REQUIRED")
        String zipCode) {}
