package com.centre.poly.person;

import com.centre.poly.person.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PersonRepository extends JpaRepository<Person, Integer> {

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Person p WHERE p.phoneNumber = :phoneNumber")
    boolean existsByPhoneNumber(String phoneNumber);

}
