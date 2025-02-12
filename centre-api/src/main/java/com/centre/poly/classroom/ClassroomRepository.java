package com.centre.poly.classroom;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    
    boolean existsByName(String name);
    
}
