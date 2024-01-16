package com.centre.poly.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Classe {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Discipline discipline;

    @ManyToOne
    private NiveauClasse niveauClasse;

    private Integer groupe;

}
