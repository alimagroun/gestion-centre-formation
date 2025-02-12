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
public class Specialty {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "specialty_sequence")
    @SequenceGenerator(name = "specialty_sequence",
                       sequenceName = "specialty_sequence",
                       allocationSize = 1)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "specialty_id")
    private Domaine domaine;
    
    @ManyToOne
    @JoinColumn(name = "formation_type_id")
    private FormationType formationType;
    
    @CreatedDate
    @Column(nullable = false,
            updatable = false)
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;
}
