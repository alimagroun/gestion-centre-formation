package com.centre.poly.classmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Inheritance(strategy = InheritanceType.JOINED)
public class Class {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "class_sequence")
  @SequenceGenerator(name = "class_sequence", sequenceName = "class_sequence", allocationSize = 1)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "specialty_id")
  private Specialty specialty;

  @Column(nullable = false)
  private int groupNumber;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdDate;

  @LastModifiedDate
  @Column(insertable = false)
  private LocalDateTime lastModifiedDate;
}
