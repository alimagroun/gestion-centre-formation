package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.AcceleratedClassEntry;
import com.centre.poly.classmanagement.entity.AcceleratedClassGroup;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AcceleratedClassRepository extends JpaRepository<AcceleratedClassGroup, Long> {
    
    
    @Query("select c from AcceleratedClassEntry c where c.student.id = :studentId and c.acceleratedClass.id = :classId")
    Optional<AcceleratedClassEntry> findByStudentAndAcceleratedClass(Long studentId, Long classId);
    
    @Query("select c from AcceleratedClassGroup c" +
            " where c.specialty.id = :specialtyId")
    List<AcceleratedClassGroup> findAllBySpecialty(Long specialtyId);
}
