package com.centre.poly.registration.dto;

import com.centre.poly.document.DocumentResponse;
import com.centre.poly.person.entity.Student;
import com.centre.poly.registration.entity.RegistrationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationDetailsResponse {
    
    private Long id;
    private RegistrationStatus status;
    private String remarks;
    private LocalDateTime createdDate;
    private Long specialtyId;
    private String specialtyName;
    private Double registrationFees;
    private StudentDetails student;
    private ParentDetails father;
    private ParentDetails mother;
    private Address address;
    private Boolean isAffected;
    private String statusChangeReason;
    private List<DocumentRegistrationResponse> documentRegistrationResponseList;
    
    
}
