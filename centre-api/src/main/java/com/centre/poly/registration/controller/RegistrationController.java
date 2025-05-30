package com.centre.poly.registration.controller;

import com.centre.poly.common.PageResponse;
import com.centre.poly.registration.dto.RegistrationDetailsResponse;
import com.centre.poly.registration.dto.RegistrationRequest;
import com.centre.poly.registration.dto.RegistrationResponse;
import com.centre.poly.registration.entity.RegistrationStatus;
import com.centre.poly.registration.service.RegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
  public ResponseEntity<PageResponse<RegistrationResponse>> findAllRegistrations(
      @RequestParam(name = "page", defaultValue = "0", required = false) int page,
      @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
    return ResponseEntity.ok().body(registrationService.findAll(page, size));
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping(value = "/{id}")
  public ResponseEntity<RegistrationDetailsResponse> findRegistrationById(@PathVariable Long id) {
    return ResponseEntity.ok().body(registrationService.findById(id));
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PutMapping("/{registrationId}/documents/{documentId}")
  public ResponseEntity<Long> addDocumentToRegistration(
      @PathVariable Long registrationId, @PathVariable Long documentId) {
    Long updatedRegistrationId =
        registrationService.addDocumentToRegistration(registrationId, documentId);
    return ResponseEntity.ok().body(updatedRegistrationId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping("/{registrationId}/students/{studentId}/accelerated-classes/{acceleratedClassId}")
  public ResponseEntity<Long> assignStudentToAcceleratedClass(
      @PathVariable Long studentId,
      @PathVariable Long registrationId,
      @PathVariable Long acceleratedClassId) {

    Long entryId =
        registrationService.addStudentToAcceleratedClass(
            studentId, registrationId, acceleratedClassId);
    return ResponseEntity.ok().body(entryId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping("/{registrationId}/students/{studentId}/accredited-classes/{accreditedClassId}")
  public ResponseEntity<Long> assignStudentToAccreditedClass(
      @PathVariable Long studentId,
      @PathVariable Long registrationId,
      @PathVariable Long accreditedClassId) {

    Long entryId =
        registrationService.addStudentToAccreditClass(studentId, registrationId, accreditedClassId);
    return ResponseEntity.ok().body(entryId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PatchMapping("/status")
  public ResponseEntity<Long> updateRegistrationStatus(
      @RequestParam Long registrationId,
      @RequestParam(required = false) String statusChangeReason,
      @RequestParam RegistrationStatus status) {
    Long updatedRegistrationId =
        registrationService.updateRegistrationStatus(registrationId, status, statusChangeReason);
    return ResponseEntity.ok().body(updatedRegistrationId);
  }
}
