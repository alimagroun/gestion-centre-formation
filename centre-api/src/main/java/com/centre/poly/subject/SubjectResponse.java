package com.centre.poly.subject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectResponse {

  private Long id;
  private String name;
  private String description;
  private int totalHours;
  private int theoreticalHours;
  private int practicalHours;
  private String specialty;
  private boolean isPdfFile;
}
