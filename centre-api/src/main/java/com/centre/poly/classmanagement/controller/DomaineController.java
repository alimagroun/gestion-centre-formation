package com.centre.poly.classmanagement.controller;

import com.centre.poly.classmanagement.dto.DomaineRequest;
import com.centre.poly.classmanagement.dto.DomaineResponse;
import com.centre.poly.classmanagement.service.DomaineService;
import com.centre.poly.common.ApiResponse;
import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("domaine")
public class DomaineController {

  private final DomaineService domaineService;

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping
  public ResponseEntity<Long> saveDomain(@Valid @RequestBody DomaineRequest request) {
    return ResponseEntity.ok().body(domaineService.save(request));
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping
  public ResponseEntity<PageResponse<DomaineResponse>> findAllDomain(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
    return ResponseEntity.ok().body(domaineService.findAllPageable(page, size));
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping(value = "/allList")
  public ResponseEntity<List<DomaineResponse>> findAllDomainsList() {
    return ResponseEntity.ok().body(domaineService.findAll());
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse<Void>> deleteDomain(@PathVariable Long id) {
    domaineService.deleteById(id);
    ApiResponse<Void> response =
        ApiResponse.<Void>builder()
            .success(true)
            .status(200)
            .message("Domaine deleted successfully")
            .build();
    return ResponseEntity.ok(response);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ApiResponse<Long>> updateDomaine(
      @PathVariable Long id, @Valid @RequestBody DomaineRequest request) {

    Long updatedId = domaineService.update(id, request);

    ApiResponse<Long> response =
        ApiResponse.<Long>builder()
            .success(true)
            .status(200)
            .message("Domaine updated successfully")
            .data(updatedId)
            .build();

    return ResponseEntity.ok(response);
  }
}
