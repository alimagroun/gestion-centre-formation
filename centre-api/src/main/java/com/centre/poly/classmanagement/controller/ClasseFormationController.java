package com.centre.poly.classmanagement.controller;

import com.centre.poly.classmanagement.dto.*;
import com.centre.poly.classmanagement.entity.AcceleratedClassGroup;
import com.centre.poly.classmanagement.service.ClassService;
import com.centre.poly.common.PageResponse;
import com.lowagie.text.DocumentException;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("class")
public class ClasseFormationController {

  private final ClassService classService;

  @PostMapping("/accredited")
  public ResponseEntity<Long> saveAccreditedClass(
      @RequestBody @Valid AccreditedClassRequest request) {
    return new ResponseEntity<>(classService.saveAccreditedClass(request), HttpStatus.CREATED);
  }

  @PostMapping("/accelerated")
  public ResponseEntity<Long> saveAcceleratedClass(
      @RequestBody @Valid AcceleratedClassRequest request) {
    return new ResponseEntity<>(classService.saveAcceleratedClass(request), HttpStatus.CREATED);
  }

  @GetMapping("/accredited")
  public ResponseEntity<PageResponse<AccreditedClassResponse>> findAllAccreditedClass(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

    return new ResponseEntity<>(classService.findAllAccreditedClass(page, size), HttpStatus.OK);
  }

  @GetMapping("/accelerated")
  public ResponseEntity<PageResponse<AcceleratedClassResponse>> findAllAcceleratedClass(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

    return new ResponseEntity<>(classService.findAllAcceleratedClass(page, size), HttpStatus.OK);
  }

  @GetMapping("/accelerated/all")
  public ResponseEntity<List<AcceleratedClassGroup>> findAllAcceleratedClasses() {
    return ResponseEntity.ok(classService.findAll());
  }

  @GetMapping("/accredited/specialty/{specialtyId}")
  public ResponseEntity<List<AccreditedClassResponse>> findAllAccreditedClassBySpecialty(
      @PathVariable Long specialtyId) {
    List<AccreditedClassResponse> responseList =
        classService.findAllAccreditedClassBySpecialty(specialtyId);
    return ResponseEntity.ok(responseList);
  }

  @GetMapping("/accelerated/specialty/{specialtyId}")
  public ResponseEntity<List<AcceleratedClassResponse>> findAllAcceleratedClassBySpecialty(
      @PathVariable Long specialtyId) {
    List<AcceleratedClassResponse> responseList =
        classService.findAllAcceleratedClassBySpecialty(specialtyId);
    return ResponseEntity.ok(responseList);
  }

  @GetMapping("/accelerated/{classId}/students")
  public ResponseEntity<List<ClassStudentResponse>> findAllStudentByAcceleratedClassId(
      @PathVariable Long classId) {
    List<ClassStudentResponse> responseList =
        classService.findAllStudentByAcceleratedClassId(classId);
    return ResponseEntity.ok(responseList);
  }

  @GetMapping("/accredited/{classId}/students")
  public ResponseEntity<List<ClassStudentResponse>> findAllStudentByAccreditedClassId(
      @PathVariable Long classId) {
    List<ClassStudentResponse> responseList =
        classService.findAllStudentByAccreditedClassId(classId);
    return ResponseEntity.ok(responseList);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping("/students/{studentId}/accelerated-classes/{acceleratedClassId}")
  public ResponseEntity<Long> addStudentToAcceleratedClass(
      @PathVariable Long studentId, @PathVariable Long acceleratedClassId) {

    Long entryId = classService.addStudentToAcceleratedClass(studentId, acceleratedClassId);
    return ResponseEntity.ok().body(entryId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping("/students/{studentId}/accredited-classes/{accreditedClassId}")
  public ResponseEntity<Long> addStudentToAccreditedClass(
      @PathVariable Long studentId, @PathVariable Long accreditedClassId) {

    Long entryId = classService.addStudentToAccreditClass(studentId, accreditedClassId);
    return ResponseEntity.ok().body(entryId);
  }

  @GetMapping(value = "/{classId}/students/export", produces = MediaType.APPLICATION_PDF_VALUE)
  public ResponseEntity<byte[]> exportClassStudentsAsPdf(
      @PathVariable Long classId,
      @RequestParam Boolean isAccelerated,
      @RequestParam Boolean isAccredited) {

    try {
      byte[] pdfBytes = classService.generateClassStudentPdf(classId, isAccredited, isAccelerated);
      String filename = classId + ".pdf";

      HttpHeaders headers = new HttpHeaders();
      headers.add("Content-Disposition", "attachment; filename=" + filename);

      return ResponseEntity.ok().headers(headers).body(pdfBytes);
    } catch (IOException | DocumentException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
