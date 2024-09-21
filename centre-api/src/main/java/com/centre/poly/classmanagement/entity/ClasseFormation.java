package com.centre.poly.classmanagement.entity;

import com.centre.poly.schoolYear.SchoolYear;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class ClasseFormation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "classe_formation_sequence")
    @SequenceGenerator(name = "classe_formation_sequence", sequenceName = "classe_formation_sequence", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "formation_id", nullable = false)
    private Formation formation;

    @ManyToOne
    @JoinColumn(name = "domaine_id", nullable = false)
    private Domaine domaine;

    @Column(nullable = false)
    private int groupNumber;

    @ManyToOne
    @JoinColumn(name = "school_year_id", nullable = false)
    private SchoolYear schoolYear;
}
