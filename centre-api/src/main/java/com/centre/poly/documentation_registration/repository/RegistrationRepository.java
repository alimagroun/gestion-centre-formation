package com.centre.poly.documentation_registration.repository;

import com.centre.poly.documentation_registration.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration, Integer> {
}
