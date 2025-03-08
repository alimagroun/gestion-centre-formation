package com.centre.poly.registration.dto;

import com.centre.poly.person.entity.MaritalStatus;
import com.centre.poly.person.entity.ParentType;
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
  private MaritalStatus maritalStatus;
  private Boolean isDeceased;
}
