package com.centre.poly.registration.repository;

import com.centre.poly.registration.entity.RegistrationDocumentEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationDocumentEntryRepository extends JpaRepository<RegistrationDocumentEntry, Long> {
}
