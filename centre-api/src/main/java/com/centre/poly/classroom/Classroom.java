package com.centre.poly.classroom;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Classroom {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "classroom_sequence")
  @SequenceGenerator(
      name = "classroom_sequence",
      sequenceName = "classroom_sequence",
      allocationSize = 1)
  private Long id;

  private String name;

  @Enumerated(EnumType.STRING)
  private ClassroomType type;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdDate;

  @LastModifiedDate
  @Column(insertable = false)
  private LocalDateTime lastModifiedDate;
}
