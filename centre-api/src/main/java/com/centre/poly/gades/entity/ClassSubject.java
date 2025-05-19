package com.centre.poly.gades.entity;

import com.centre.poly.classmanagement.entity.ClassGroup;
import com.centre.poly.subject.Subject;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class ClassSubject {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "class_subject_sequence")
  @SequenceGenerator(
      name = "class_subject_sequence",
      sequenceName = "class_subject_sequence",
      allocationSize = 1)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "class_id")
  private ClassGroup classGroupEntity;

  @ManyToOne
  @JoinColumn(name = "subject_id")
  private Subject subject;

  private int semester;
  private int coefficient;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdDate;

  @LastModifiedDate
  @Column(insertable = false)
  private LocalDateTime lastModifiedDate;
}
