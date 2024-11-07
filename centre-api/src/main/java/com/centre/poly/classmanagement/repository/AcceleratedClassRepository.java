package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.AcceleratedClass;
import com.centre.poly.classmanagement.entity.AcceleratedClassEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface AcceleratedClassRepository extends JpaRepository<AcceleratedClass, Long> {


    @Query("select c from AcceleratedClassEntry c where c.student.id = :studentId and c.acceleratedClass.id = :classId")
    Optional<AcceleratedClassEntry> findByStudentAndAcceleratedClass(Long studentId, Long classId);

    @Query("select c from AcceleratedClass c" +
            " where c.specialty.id = :specialtyId")
    List<AcceleratedClass> findAllBySpecialty(Long specialtyId);
}
