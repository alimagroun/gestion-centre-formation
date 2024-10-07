package com.centre.poly.person.controller;

import com.centre.poly.common.PageResponse;
import com.centre.poly.person.dto.ParentDetailResponse;
import com.centre.poly.person.dto.ParentResponse;
import com.centre.poly.person.dto.StudentResponse;
import com.centre.poly.person.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/findParentByNum")
    public ResponseEntity<ParentResponse> findParentByNum(@RequestParam("num") String num) {
        return ResponseEntity.ok().body(personService.findParentByNum(num));
    }

    @GetMapping("/parent/findAllParentsPaged")
    public ResponseEntity<PageResponse<ParentResponse>> findAllParentsPaged(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        return ResponseEntity.ok().body(personService.findAllParentsPaged(page, size));
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<ParentDetailResponse> findParentDetailById(@PathVariable Long parentId) {
        return ResponseEntity.ok(personService.findParentDetailById(parentId));
    }

    @GetMapping("/parent/{parentId}/students")
    public ResponseEntity<List<StudentResponse>> findAllStudentsByParentId(@PathVariable Long parentId) {
        List<StudentResponse> students = personService.findAllStudentsByParentId(parentId);
        return ResponseEntity.ok(students);
    }


    @GetMapping("/person/student")
    public ResponseEntity<PageResponse<StudentResponse>> findAllStudentsPaged(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size){
        return ResponseEntity.ok().body(personService.findAllStudentsPaged(page, size));

    }
}
