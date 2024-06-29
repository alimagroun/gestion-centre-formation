package com.centre.poly.registration.controller;

import com.centre.poly.registration.DocumentRequest;
import com.centre.poly.registration.DocumentResponse;
import com.centre.poly.registration.service.DocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("document")
@RequiredArgsConstructor
public class DocumentsController {

    private final DocumentService service;

    @PostMapping
    public ResponseEntity<Integer> save(@RequestBody @Valid DocumentRequest documentRequest) {
        return ResponseEntity.ok().body(service.save(documentRequest));
    }

    @GetMapping
    public ResponseEntity<List<DocumentResponse>> findAll() {
        return ResponseEntity.ok().body(service.findAll());
    }
}
