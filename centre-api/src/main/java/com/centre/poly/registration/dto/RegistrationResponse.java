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
    private String remarks;
    private LocalDateTime createdDate;
    private String fullNameStudent;

}
