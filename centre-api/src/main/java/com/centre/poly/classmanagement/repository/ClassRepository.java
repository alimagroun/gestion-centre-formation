package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.ClassGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends JpaRepository<ClassGroup, Long> {}
