package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.ClasseFormation;
import com.centre.poly.classmanagement.entity.Domaine;
import com.centre.poly.classmanagement.entity.Formation;
import com.centre.poly.schoolYear.SchoolYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ClasseFormationRepository extends JpaRepository<ClasseFormation, Long> {

    @Query("select c from ClasseFormation c where " +
            " c.domaine.id = :domaineId " +
            " and c.formation.id = :formationId " +
            " and c.schoolYear.id = :schoolYearId " +
            " and c.groupNumber = :groupNumber" +
            " and c.yearLevel = :yearLevel ")
    Optional<ClasseFormation> findClasseFromation(Long formationId, Long domaineId, Long schoolYearId, int groupNumber, int yearLevel);
}
