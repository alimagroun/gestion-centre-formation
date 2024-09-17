package com.centre.poly.specialty.repositories;

import com.centre.poly.specialty.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormationRepository extends JpaRepository<Formation, Integer> {

    Formation findByName(String name);
}
