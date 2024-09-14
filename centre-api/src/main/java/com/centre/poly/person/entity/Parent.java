package com.centre.poly.person.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
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

    @OneToMany(fetch = FetchType.LAZY)
    private List<Student> students;

}
