package com.centre.poly.documentation_registration.repository;

import com.centre.poly.documentation_registration.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentsRepository extends JpaRepository<Document, Integer> {
}
