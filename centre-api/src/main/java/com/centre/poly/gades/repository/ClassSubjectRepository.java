package com.centre.poly.gades.repository;

import com.centre.poly.classmanagement.entity.ClassGroup;
import com.centre.poly.gades.entity.ClassSubject;
import com.centre.poly.subject.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassSubjectRepository extends JpaRepository<ClassSubject, Long> {

  boolean existsByClassGroupEntityAndSubjectAndSemester(
      ClassGroup classGroupEntity, Subject subject, int semester);
}
