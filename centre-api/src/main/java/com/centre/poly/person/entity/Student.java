package com.centre.poly.person.entity;

import com.centre.poly.classmanagement.entity.AcceleratedClass;
import com.centre.poly.classmanagement.entity.AcceleratedClassEntry;
import com.centre.poly.classmanagement.entity.AccreditedClass;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Student extends Person {
    
    private String levelOfEducation;
    private String identityNumber;
    
    @ManyToOne
    @JoinColumn(name = "mother_id")
    private Parent mother;
    
    @ManyToOne
    @JoinColumn(name = "father_id")
    private Parent father;
    
}
