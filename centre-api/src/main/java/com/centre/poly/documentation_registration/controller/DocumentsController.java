package com.centre.poly.documentation_registration.controller;

import com.centre.poly.common.PageResponse;
import com.centre.poly.documentation_registration.DocumentRequest;
import com.centre.poly.documentation_registration.DocumentResponse;
import com.centre.poly.documentation_registration.service.DocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("document")
@RequiredArgsConstructor
public class DocumentsController {

    private final DocumentService service;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Integer> saveDocument(@RequestBody @Valid DocumentRequest documentRequest) {
        return ResponseEntity.ok().body(service.save(documentRequest));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<PageResponse<DocumentResponse>> findAllDocuments(
            @RequestParam(name = "page", defaultValue = "0",
                    required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        return ResponseEntity.ok().body(service.findAll(page, size));
    }
}
