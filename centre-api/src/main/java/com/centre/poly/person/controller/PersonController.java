package com.centre.poly.person.controller;

import com.centre.poly.common.ApiResponse;
import com.centre.poly.common.PageResponse;
import com.centre.poly.common.SecurityUtil;
import com.centre.poly.person.dto.*;
import com.centre.poly.person.entity.ParentType;
import com.centre.poly.person.service.PersonService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("person")
@RequiredArgsConstructor
public class PersonController {

  private final PersonService personService;

  @GetMapping(value = "/validation/phone-number")
  public ResponseEntity<Boolean> phoneNumberValidation(@RequestParam String phoneNumber) {
    return ResponseEntity.ok().body(personService.isPhoneNumberUnique(phoneNumber));
  }

  @GetMapping(value = "/validation/email")
  public ResponseEntity<Boolean> emailValidation(@RequestParam String email) {
    return ResponseEntity.ok().body(personService.isEmailUnique(email));
  }

  @GetMapping(value = "/validation/identity-number")
  public ResponseEntity<Boolean> identityNumberValidation(@RequestParam String identityNumber) {
    return ResponseEntity.ok().body(personService.isIdentityNumberUnique(identityNumber));
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/findParentByNum")
  public ResponseEntity<ParentResponse> findParentByNum(
      @RequestParam("num") String num, @RequestParam("type") ParentType type) {
    return ResponseEntity.ok().body(personService.findByPhoneNumberAndType(num, type));
  }

  @GetMapping("/parent/findAllParentsPaged")
  public ResponseEntity<PageResponse<ParentResponse>> findAllParentsPaged(
      @RequestParam(name = "page", defaultValue = "0", required = false) int page,
      @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
    return ResponseEntity.ok().body(personService.findAllParentsPaged(page, size));
  }

  @GetMapping("/parent/{parentId}")
  public ResponseEntity<ParentDetailResponse> findParentDetailById(@PathVariable Long parentId) {
    return ResponseEntity.ok(personService.findParentDetailById(parentId));
  }

  @GetMapping("/parent/{parentId}/students")
  public ResponseEntity<List<StudentResponse>> findAllStudentsByParentId(
      @PathVariable Long parentId) {
    List<StudentResponse> students = personService.findAllStudentsByParentId(parentId);
    return ResponseEntity.ok(students);
  }

  @GetMapping("/person/student")
  public ResponseEntity<PageResponse<StudentResponse>> findAllStudentsPaged(
      @RequestParam(name = "page", defaultValue = "0", required = false) int page,
      @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
    return ResponseEntity.ok().body(personService.findAllStudentsPaged(page, size));
  }

  @GetMapping("/student/{studentId}")
  public ResponseEntity<StudentDetailsResponse> findStudentById(@PathVariable Long studentId) {
    return ResponseEntity.ok().body(personService.findStudentById(studentId));
  }

  @GetMapping("/student/all")
  public ResponseEntity<List<StudentAllResponse>> getAllStudents() {
    List<StudentAllResponse> students = personService.findAllStudent();
    return ResponseEntity.ok(students);
  }

  @PostMapping("/teacher")
  public ResponseEntity<ApiResponse> addTeacher(@RequestBody @Valid TeacherRequest teacherRequest) {
    Long id = personService.addTeacher(teacherRequest);
    return ResponseEntity.ok()
        .body(ApiResponse.builder().success(true).status(200).message("Success").build());
  }

  @GetMapping("/teacher")
  public ResponseEntity<PageResponse<TeacherResponse>> findAllTeachersPaged(
      @RequestParam(name = "page", defaultValue = "0", required = false) int page,
      @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
    return ResponseEntity.ok().body(personService.getTeachersPage(page, size));
  }

  @PreAuthorize("hasRole('ROLE_STUDENT')")
  @GetMapping("/student/info")
  public ResponseEntity<StudentDetailsResponse> getStudentInfo() {
    Long studentId = SecurityUtil.getCurrentPersonId();
    return ResponseEntity.ok(personService.findStudentById(studentId));
  }

  @PreAuthorize("hasRole('ROLE_TEACHER')")
  @GetMapping("/teacher/info")
  public ResponseEntity<TeacherResponse> getTeacherInfo() {
    Long teacherId = SecurityUtil.getCurrentPersonId();
    return ResponseEntity.ok(personService.findTeacherById(teacherId));
  }

  @PreAuthorize("hasRole('ROLE_STUDENT')")
  @GetMapping("/student/class")
  public ResponseEntity<StudentClassResponse> getStudentClass() {
    Long studentId = SecurityUtil.getCurrentPersonId();
    return ResponseEntity.ok(personService.getClassOfStudent(studentId));
  }
}
