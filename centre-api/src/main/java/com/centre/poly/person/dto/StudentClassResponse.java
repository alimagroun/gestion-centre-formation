package com.centre.poly.person.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentClassResponse {

  private String specialtyName;
  private String schoolYear;
  private int yearLevel;
  private int groupNumber;
}
