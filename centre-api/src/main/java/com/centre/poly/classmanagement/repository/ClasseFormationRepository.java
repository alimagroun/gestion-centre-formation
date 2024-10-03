package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface ClasseFormationRepository extends JpaRepository<Class, Long> {

    @Query("select c from AccreditedClass c where " +
            " c.specialty.id = :specialtyId " +
            " and c.schoolYear.id = :schoolYearId " +
            " and c.groupNumber = :groupNumber" +
            " and c.yearLevel = :yearLevel ")
    Optional<Class> findAccreditedClass(Long specialtyId, Long schoolYearId, int groupNumber, int yearLevel);

    @Query("select c from AcceleratedClass c where " +
            " c.specialty.id = :specialtyId " +
            " and c.groupNumber = :groupNumber" +
            " and c.startDate = :startDate " +
            " and c.endDate =:endDate ")
    Optional<Class> findAcceleratedClass(Long specialtyId, int groupNumber, LocalDate startDate, LocalDate endDate);


}
