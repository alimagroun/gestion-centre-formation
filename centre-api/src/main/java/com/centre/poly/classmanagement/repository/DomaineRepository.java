package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.Domaine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomaineRepository extends JpaRepository<Domaine, Long> {
    Domaine findByName(String name);
}
