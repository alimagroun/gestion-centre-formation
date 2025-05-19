package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.AccreditedClassGroup;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccreditedClassRepository extends JpaRepository<AccreditedClassGroup, Long> {

  @Query("select c from AccreditedClassGroup c where c.specialty.id = :specialtyId")
  List<AccreditedClassGroup> findAllBySpecialty(Long specialtyId);

  @Query("select c from AccreditedClassGroup c where c.id = :classId")
  Optional<AccreditedClassGroup> findByClassId(Long classId);
}
