package com.centre.poly.person.dto;

import java.util.Date;

public record ParentRequest(
        Integer id,
        String firstName,
        String lastName,
        String phoneNumber,
        String email,
        String profession
) {
}
