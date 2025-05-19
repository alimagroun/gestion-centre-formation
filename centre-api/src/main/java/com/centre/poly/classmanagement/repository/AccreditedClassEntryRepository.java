package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.AccreditedClassEntry;
import com.centre.poly.classmanagement.entity.AccreditedClassGroup;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccreditedClassEntryRepository extends JpaRepository<AccreditedClassEntry, Long> {

  @Query(
      "select c from AccreditedClassEntry c "
          + "where c.student.id = :studentId "
          + "and c.accreditedClass.id = :accreditedClassId")
  Optional<AccreditedClassEntry> findByStudentAndClass(Long studentId, Long accreditedClassId);

  @Query("select c from AccreditedClassEntry c " + "where c.accreditedClass.id = :classId")
  List<AccreditedClassEntry> findAllByClassId(Long classId);

  // AccreditedClassEntryRepository.java
  @Query(
      """
                SELECT ace.accreditedClass
                FROM AccreditedClassEntry ace
                WHERE ace.student.id = :studentId
                  AND ace.accreditedClass.schoolYear.isDefault = true
            """)
  Optional<AccreditedClassGroup> findClassOfStudentInDefaultYear(
      @Param("studentId") Long studentId);
}
