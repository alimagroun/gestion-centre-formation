package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.AcceleratedClassEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AcceleratedClassEntryRepository extends JpaRepository<AcceleratedClassEntry, Long> {
    
    @Query("select c from AcceleratedClassEntry c " +
            "where c.student.id = :studentId " +
            "and c.acceleratedClass.id = :acceleratedClassId")
    Optional<AcceleratedClassEntry> findByStudentAndClass(Long studentId, Long acceleratedClassId);
    
    @Query("select c from AcceleratedClassEntry c " +
            "where c.acceleratedClass.id = :classId")
    List<AcceleratedClassEntry> findAllByClassId(Long classId);
}
