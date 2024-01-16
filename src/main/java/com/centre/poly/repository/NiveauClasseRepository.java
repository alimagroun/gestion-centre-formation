package com.centre.poly.repository;

import com.centre.poly.model.NiveauClasse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NiveauClasseRepository extends JpaRepository<NiveauClasse, Long> {

    NiveauClasse getNiveauClasseByNom(String nom);
}
