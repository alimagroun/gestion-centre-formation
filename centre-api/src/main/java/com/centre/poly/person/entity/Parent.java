package com.centre.poly.person.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Parent extends Person {

    private String profession;

    @Enumerated(EnumType.STRING)
    private ParentType type;

    @Enumerated(EnumType.STRING)
    private MaritalStatus maritalStatus;

    private Boolean isDeceased;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Student> students;

}
