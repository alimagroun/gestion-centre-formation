package com.centre.poly.specialty.controller;

import com.centre.poly.common.PageResponse;
import com.centre.poly.specialty.dto.DomainRequest;
import com.centre.poly.specialty.dto.DomainResponse;
import com.centre.poly.specialty.dto.FormationRequest;
import com.centre.poly.specialty.dto.FormationResponse;
import com.centre.poly.specialty.service.DomainService;
import com.centre.poly.specialty.service.FormationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("domain")
public class DomainController {

    private final DomainService domainService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Integer> createDomain(@RequestBody @Valid DomainRequest request) {
        return ResponseEntity.ok().body(domainService.createDomain(request));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<PageResponse<DomainResponse>> findAllDomains(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size
            ){
        return ResponseEntity.ok(domainService.findAll(page, size));
    }
}

