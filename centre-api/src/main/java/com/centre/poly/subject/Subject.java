package com.centre.poly.subject;

import com.centre.poly.classmanagement.entity.Specialty;
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
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Subject {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "subject_sequence")
  @SequenceGenerator(
      name = "subject_sequence",
      sequenceName = "subject_sequence",
      allocationSize = 1)
  private Long id;

  private String name;
  private String description;
  private int totalHours;
  private int theoreticalHours;
  private int practicalHours;

  @Lob
  @Column(columnDefinition = "LONGBLOB")
  private byte[] pdfFile;

  @ManyToOne
  @JoinColumn(name = "specialty_id", nullable = false)
  private Specialty specialty;

  @CreatedDate
  @Column(updatable = false)
  private LocalDateTime createdDate;

  @LastModifiedDate private LocalDateTime lastModifiedDate;
}
