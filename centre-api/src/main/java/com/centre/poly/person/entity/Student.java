package com.centre.poly.person.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
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
