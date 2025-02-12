package com.centre.poly.person.dto;

import com.centre.poly.person.entity.MaritalStatus;
import com.centre.poly.person.entity.ParentType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParentResponse {
    
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String profession;
    private ParentType type;
    private MaritalStatus maritalStatus;
    private Boolean isDeceased;
    
}
