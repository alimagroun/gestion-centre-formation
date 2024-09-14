package com.centre.poly.registration.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParentDetails {
    private Long id;
    private String fullName;
    private String profession;
    private String phoneNumber;
    private String email;
}
