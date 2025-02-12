package com.centre.poly.document;

import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("document")
@RequiredArgsConstructor
public class DocumentsController {
    
    private final DocumentService service;
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Long> saveDocument(@RequestBody @Valid DocumentRequest documentRequest) {
        return ResponseEntity.ok()
                             .body(service.save(documentRequest));
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<PageResponse<DocumentResponse>> findAllDocumentsPageable(
            @RequestParam(name = "page",
                          defaultValue = "0",
                          required = false) int page,
            @RequestParam(name = "size",
                          defaultValue = "10",
                          required = false) int size) {
        return ResponseEntity.ok()
                             .body(service.findAllPageable(page, size));
    }
    
    @GetMapping("/findAll")
    public ResponseEntity<List<DocumentResponse>> findAllDocuments() {
        return ResponseEntity.ok()
                             .body(service.findAll());
    }
}
