package com.centre.poly.registration.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentDetails {
  private Long id;
  private String fullName;
  private String levelOfEducation;
  private String phoneNumber;
  private String email;
  private String identityNumber;
  private Date dateOfBirth;
}
