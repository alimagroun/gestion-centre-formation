package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.Formation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormationRepository extends JpaRepository<Formation, Long> {

    Formation findByNameIgnoreCase(String name);

}
