package com.centre.poly.classroom;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Classroom {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "classroom_sequence")
    @SequenceGenerator(name = "classroom_sequence",
                       sequenceName = "classroom_sequence",
                       allocationSize = 1)
    private Long id;
    
    private String name;
    
    private String type;
    
    @CreatedDate
    @Column(nullable = false,
            updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;
    
}