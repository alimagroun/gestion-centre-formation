package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.AccreditedClass;
import com.centre.poly.classmanagement.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface AccreditedClassRepository extends JpaRepository<AccreditedClass, Long> {


    @Query("select c from AccreditedClass c where c.specialty.id = :specialtyId")
    List<AccreditedClass> findAllBySpecialty(Long specialtyId);
}
