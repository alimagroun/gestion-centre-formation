package com.centre.poly.registration.repository;

import com.centre.poly.registration.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

}
