package com.centre.poly.person.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherResponse {

  private Long id;
  private String fullName;
  private String speciality;
  private String teacherStatus;
}
