package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.Domaine;
import com.centre.poly.classmanagement.entity.FormationType;
import com.centre.poly.classmanagement.entity.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpecialtyRepository extends JpaRepository<Specialty, Long> {
    
    Optional<Specialty> findByDomaineAndFormationType(Domaine domaine, FormationType formationType);
    
}
