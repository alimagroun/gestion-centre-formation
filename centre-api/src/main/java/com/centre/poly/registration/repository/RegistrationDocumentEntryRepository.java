package com.centre.poly.registration.repository;

import com.centre.poly.registration.entity.RegistrationDocumentEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RegistrationDocumentEntryRepository extends JpaRepository<RegistrationDocumentEntry, Long> {
    
    @Query("select d from RegistrationDocumentEntry d where d.registration.id = :registrationId and d.document.id = :documentId")
    Optional<RegistrationDocumentEntry> findByRegistrationAndDocument(Long registrationId, Long documentId);
    
}
