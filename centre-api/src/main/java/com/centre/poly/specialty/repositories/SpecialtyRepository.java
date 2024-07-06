package com.centre.poly.specialty.repositories;

import com.centre.poly.specialty.entities.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SpecialtyRepository extends JpaRepository<Specialty, Integer> {

    @Query("SELECT s FROM Specialty s where s.formation.id = :formationId and s.domain.id = :domainId")
    Specialty findByFormationAndDomain(Integer formationId, Integer domainId);
}
