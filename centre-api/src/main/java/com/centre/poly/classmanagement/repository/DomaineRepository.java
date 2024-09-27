package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.Domaine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DomaineRepository extends JpaRepository<Domaine, Long> {

    @Query("SELECT d FROM Domaine d WHERE LOWER(d.name) = LOWER(:name)")
    Domaine findByName(String name);

}
