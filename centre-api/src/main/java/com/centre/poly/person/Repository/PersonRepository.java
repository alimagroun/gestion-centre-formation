package com.centre.poly.person.Repository;

import com.centre.poly.person.entity.Parent;
import com.centre.poly.person.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Person p WHERE p.phoneNumber = :phoneNumber")
    boolean existsByPhoneNumber(String phoneNumber);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Person p WHERE p.email = :email")
    boolean existByEmail(String email);


    @Query("SELECT p FROM Parent p WHERE p.phoneNumber = :phoneNumber")
    Parent findByPhoneNumber(String phoneNumber);

}
