package com.centre.poly.classmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "formation_sequence")
    @SequenceGenerator(name = "formation_sequence", sequenceName = "formation_sequence", allocationSize = 1)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // BTP, CAP, etc.

    private String description;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

}
