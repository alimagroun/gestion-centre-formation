package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.AccreditedClass;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccreditedClassRepository extends JpaRepository<AccreditedClass, Long> {

  @Query("select c from AccreditedClass c where c.specialty.id = :specialtyId")
  List<AccreditedClass> findAllBySpecialty(Long specialtyId);

  @Query("select c from AccreditedClass c where c.id = :classId")
  Optional<AccreditedClass> findByClassId(Long classId);
}
