package com.centre.poly.person.dto;

public record AddressRequest(
        String street,
        String city,
        String zipCode
) {
}
