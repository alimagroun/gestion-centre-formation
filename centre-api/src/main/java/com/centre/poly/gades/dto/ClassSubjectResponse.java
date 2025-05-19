package com.centre.poly.gades.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassSubjectResponse {

  String subjectName;
  private int semester;
  private int coefficient;
}
