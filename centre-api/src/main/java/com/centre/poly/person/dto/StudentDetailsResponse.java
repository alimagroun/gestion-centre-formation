package com.centre.poly.person.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentDetailsResponse {
    Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String levelOfEducation;
    
    private AddressDTO address;
    private ParentDTO mother;
    private ParentDTO father;
    
    private ParentStatusDTO parentStatus;
    
    
}
