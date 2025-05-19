package com.centre.poly.gades.controller;

import com.centre.poly.common.ApiResponse;
import com.centre.poly.common.PageResponse;
import com.centre.poly.gades.dto.ClassSubjectRequest;
import com.centre.poly.gades.dto.ClassSubjectResponse;
import com.centre.poly.gades.service.ClassSubjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/class-subjects")
@RequiredArgsConstructor
public class ClassSubjectController {

  private final ClassSubjectService classSubjectService;

  @PostMapping
  public ResponseEntity<ApiResponse> addClassSubject(
      @Valid @RequestBody ClassSubjectRequest request) {
    Long id = classSubjectService.addClassSubject(request);
    return ResponseEntity.ok(
        ApiResponse.builder().status(200).success(true).message("add success").build());
  }

  @GetMapping
  public ResponseEntity<PageResponse<ClassSubjectResponse>> getAllClassSubjects(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

    PageResponse<ClassSubjectResponse> response = classSubjectService.findAll(page, size);
    return ResponseEntity.ok(response);
  }
}
