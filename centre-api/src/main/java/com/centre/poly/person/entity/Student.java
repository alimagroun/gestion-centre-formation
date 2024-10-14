package com.centre.poly.person.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Student extends Person {

    private String levelOfEducation;


    @ManyToOne
    @JoinColumn(name = "mother_id")
    private Parent mother;

    @ManyToOne
    @JoinColumn(name = "father_id")
    private Parent father;

}
