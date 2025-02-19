package com.centre.poly.person.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Teacher extends Person {

  private String speciality;
  private String diplomasObtained;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private TeacherStatus teacherStatus;
}
