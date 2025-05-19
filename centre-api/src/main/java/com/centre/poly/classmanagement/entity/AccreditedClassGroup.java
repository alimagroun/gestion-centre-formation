package com.centre.poly.classmanagement.entity;

import com.centre.poly.schoolYear.SchoolYear;
import jakarta.persistence.*;
import java.util.List;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AccreditedClassGroup extends ClassGroup {

  @ManyToOne
  @JoinColumn(name = "school_year_id", nullable = false)
  private SchoolYear schoolYear;

  @Column(nullable = false)
  private int yearLevel; // 1 for the first year, 2 for the second year

  @OneToMany(mappedBy = "accreditedClass")
  private List<AccreditedClassEntry> accreditedClassEntries;
}
