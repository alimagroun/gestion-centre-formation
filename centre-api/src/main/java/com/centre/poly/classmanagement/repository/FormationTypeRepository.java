package com.centre.poly.classmanagement.repository;

import com.centre.poly.classmanagement.entity.FormationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormationTypeRepository extends JpaRepository<FormationType, Long> {
    
    FormationType findByNameIgnoreCase(String name);
    
}
