package com.centre.poly.classmanagement.entity;

import com.centre.poly.person.entity.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AccreditedClassEntry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "accredited_class_sequence")
    @SequenceGenerator(name = "accredited_class_sequence",
                       sequenceName = "accredited_class_sequence",
                       allocationSize = 1)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
    
    @ManyToOne
    @JoinColumn(name = "accreditedClass_class_id")
    private AccreditedClass accreditedClass;
    
}
