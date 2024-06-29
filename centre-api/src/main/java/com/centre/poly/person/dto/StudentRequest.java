package com.centre.poly.person.dto;

import java.util.Date;

public record StudentRequest(
        String firstName,
        String lastName,
        String phoneNumber,
        String email,
        String levelOfEducation
) {
}
