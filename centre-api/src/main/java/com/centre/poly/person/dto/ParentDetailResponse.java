package com.centre.poly.person.dto;

import com.centre.poly.person.entity.MaritalStatus;
import com.centre.poly.person.entity.ParentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParentDetailResponse {
    
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private ParentType type;
    private String profession;
    private MaritalStatus maritalStatus;
    private Boolean isDeceased;
    private List<StudentResponse> students;
    
}
