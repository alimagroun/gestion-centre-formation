package com.centre.poly.registration.controller;

import com.centre.poly.common.PageResponse;
import com.centre.poly.registration.dto.RegistrationDetailsResponse;
import com.centre.poly.registration.dto.RegistrationRequest;
import com.centre.poly.registration.dto.RegistrationResponse;
import com.centre.poly.registration.service.RegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("register")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Long> register(@Valid @RequestBody RegistrationRequest request) {
        return ResponseEntity.ok().body(registrationService.save(request));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<PageResponse<RegistrationResponse>> findAllRegistrations(@RequestParam(name = "page", defaultValue = "0", required = false) int page, @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        return ResponseEntity.ok().body(registrationService.findAll(page, size));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<RegistrationDetailsResponse> findRegistrationById(@PathVariable Long id) {
        return ResponseEntity.ok().body(registrationService.findById(id));
    }
}
