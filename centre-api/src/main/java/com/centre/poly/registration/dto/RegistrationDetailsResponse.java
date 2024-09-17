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

    private StudentDetails student;
    private ParentDetails parent;
    private Address address;
    private List<DocumentRegistrationResponse> documentRegistrationResponseList;


}
