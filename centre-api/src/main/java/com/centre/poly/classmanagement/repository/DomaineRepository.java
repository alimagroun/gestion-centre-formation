package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.Domaine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DomaineRepository extends JpaRepository<Domaine, Long> {

  @Query("SELECT d FROM Domaine d WHERE LOWER(d.name) = LOWER(:name)")
  Domaine findByName(String name);

  @Query(
      "SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END "
          + "FROM Class c "
          + "WHERE c.specialty.domaine.id = :domaineId")
  boolean existsInClassByDomaineId(@Param("domaineId") Long domaineId);
}
