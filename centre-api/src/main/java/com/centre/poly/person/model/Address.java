package com.centre.poly.person.model;

import jakarta.persistence.Embedded;
import lombok.*;
import org.springframework.validation.annotation.Validated;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Validated
public class Address {
    private String street;
    private String city;
    private String zipCode;
}
