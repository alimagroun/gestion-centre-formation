package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.ClassGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface ClasseFormationRepository extends JpaRepository<ClassGroup, Long> {

  @Query(
      "select c from AccreditedClassGroup c where "
          + " c.specialty.id = :specialtyId "
          + " and c.schoolYear.id = :schoolYearId "
          + " and c.groupNumber = :groupNumber"
          + " and c.yearLevel = :yearLevel ")
  Optional<ClassGroup> findAccreditedClass(
      Long specialtyId, Long schoolYearId, int groupNumber, int yearLevel);

  @Query(
      "select c from AcceleratedClassGroup c where "
          + " c.specialty.id = :specialtyId "
          + " and c.groupNumber = :groupNumber"
          + " and c.startDate = :startDate "
          + " and c.endDate =:endDate ")
  Optional<ClassGroup> findAcceleratedClass(
      Long specialtyId, int groupNumber, LocalDate startDate, LocalDate endDate);
}
