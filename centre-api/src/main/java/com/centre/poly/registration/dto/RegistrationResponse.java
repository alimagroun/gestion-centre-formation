package com.centre.poly.registration.dto;

import com.centre.poly.registration.entity.RegistrationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationResponse {
    
    private Long id;
    private RegistrationStatus status;
    private Long specialtyId;
    private String specialtyName;
    private LocalDateTime createdDate;
    private Long studentId;
    private String fullNameStudent;
    
}
