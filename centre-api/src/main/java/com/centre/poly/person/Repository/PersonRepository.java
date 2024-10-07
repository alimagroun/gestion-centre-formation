package com.centre.poly.person.Repository;

import com.centre.poly.person.entity.Parent;
import com.centre.poly.person.entity.Person;
import com.centre.poly.person.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Person p WHERE p.phoneNumber = :phoneNumber")
    boolean existsByPhoneNumber(String phoneNumber);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Person p WHERE p.email = :email")
    boolean existByEmail(String email);


    @Query("SELECT p FROM Parent p WHERE p.phoneNumber = :phoneNumber")
    Parent findByPhoneNumber(String phoneNumber);

    @Query("SELECT p FROM Parent p")
    Page<Person> findAllParentPaged(Pageable pageable);

    @Query("SELECT s FROM Student s where s.parent.id = :parentId")
    List<Student> findAllStudentsByParentId(Long parentId);

    @Query("SELECT s FROM Student s")
    Page<Student> findAllStudentPaged(Pageable pageable);

    @Query("select p from Parent p where p.id =:parentId")
    Optional<Parent> findByParentId(Long parentId);
}
