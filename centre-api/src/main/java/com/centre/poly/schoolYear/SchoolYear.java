package com.centre.poly.schoolYear;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class SchoolYear {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "school_year_sequence")
  @SequenceGenerator(
      name = "school_year_sequence",
      sequenceName = "school_year_sequence",
      allocationSize = 1)
  private Long id;

  private Integer startYear;

  private Integer endYear;

  private Boolean isDefault;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdDate;

  @LastModifiedDate
  @Column(insertable = false)
  private LocalDateTime lastModifiedDate;
}
