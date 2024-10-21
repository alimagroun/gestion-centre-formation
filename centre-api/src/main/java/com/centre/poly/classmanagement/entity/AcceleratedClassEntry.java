package com.centre.poly.classmanagement.entity;

import com.centre.poly.person.entity.Student;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AcceleratedClassEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "accelerated_class_sequence")
    @SequenceGenerator(name = "accelerated_class_sequence", sequenceName = "accelerated_class_sequence", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "accelerated_class_id")
    private AcceleratedClass acceleratedClass;

}
