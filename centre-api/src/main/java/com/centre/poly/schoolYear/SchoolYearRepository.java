package com.centre.poly.schoolYear;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SchoolYearRepository extends JpaRepository<SchoolYear, Long> {

    @Query("select s from SchoolYear s where s.isDefault = true")
    SchoolYear findAllDefaultTrue();

    @Query("select s from SchoolYear s where s.startYear= :startYear and s.endYear = :endYear")
    SchoolYear findByStarEndYear(Integer startYear, Integer endYear);
}
