package com.centre.poly.classmanagement.entity;

import com.centre.poly.person.entity.Student;
import com.centre.poly.schoolYear.SchoolYear;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AccreditedClass extends Class {

    @ManyToOne
    @JoinColumn(name = "school_year_id", nullable = false)
    private SchoolYear schoolYear;

    @Column(nullable = false)
    private int yearLevel; // 1 for the first year, 2 for the second year
}
