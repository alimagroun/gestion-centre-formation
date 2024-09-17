package com.centre.poly.specialty.repositories;

import com.centre.poly.specialty.entities.Domain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomainRepository extends JpaRepository<Domain, Integer> {
    Domain findByName(String name);
}
