package com.centre.poly.registration.repository;

import com.centre.poly.registration.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentsRepository extends JpaRepository<Document, Integer> {
}
