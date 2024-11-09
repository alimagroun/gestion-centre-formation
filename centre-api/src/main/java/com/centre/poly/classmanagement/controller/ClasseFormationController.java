package com.centre.poly.classmanagement.controller;

import com.centre.poly.classmanagement.dto.*;
import com.centre.poly.classmanagement.entity.AcceleratedClass;
import com.centre.poly.classmanagement.entity.AcceleratedClassEntry;
import com.centre.poly.classmanagement.service.ClassService;
import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("class")
public class ClasseFormationController {

    private final ClassService classService;

    @PostMapping("/accredited")
    public ResponseEntity<Long> saveAccreditedClass(@RequestBody @Valid AccreditedClassRequest request) {
        return new ResponseEntity<>(classService.saveAccreditedClass(request), HttpStatus.CREATED);
    }

    @PostMapping("/accelerated")
    public ResponseEntity<Long> saveAcceleratedClass(@RequestBody @Valid AcceleratedClassRequest request) {
        return new ResponseEntity<>(classService.saveAcceleratedClass(request), HttpStatus.CREATED);
    }

    @GetMapping("/accredited")
    public ResponseEntity<PageResponse<AccreditedClassResponse>> findAllAccreditedClass(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return new ResponseEntity<>(classService.findAllAccreditedClass(page, size), HttpStatus.OK);
    }

    @GetMapping("/accelerated")
    public ResponseEntity<PageResponse<AcceleratedClassResponse>> findAllAcceleratedClass(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return new ResponseEntity<>(classService.findAllAcceleratedClass(page, size), HttpStatus.OK);
    }

    @GetMapping("/accelerated/all")
    public ResponseEntity<List<AcceleratedClass>> findAllAcceleratedClasses() {
        return ResponseEntity.ok(classService.findAll());
    }


    @GetMapping("/accredited/specialty/{specialtyId}")
    public ResponseEntity<List<AccreditedClassResponse>> findAllAccreditedClassBySpecialty(
            @PathVariable Long specialtyId) {
        List<AccreditedClassResponse> responseList = classService.findAllAccreditedClassBySpecialty(specialtyId);
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/accelerated/specialty/{specialtyId}")
    public ResponseEntity<List<AcceleratedClassResponse>> findAllAcceleratedClassBySpecialty(
            @PathVariable Long specialtyId) {
        List<AcceleratedClassResponse> responseList = classService.findAllAcceleratedClassBySpecialty(specialtyId);
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/accelerated/{classId}/students")
    public ResponseEntity<List<ClassStudentResponse>> findAllStudentByAcceleratedClassId(
            @PathVariable Long classId) {
        List<ClassStudentResponse> responseList = classService.findAllStudentByAcceleratedClassId(classId);
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/accredited/{classId}/students")
    public ResponseEntity<List<ClassStudentResponse>> findAllStudentByAccreditedClassId(
            @PathVariable Long classId) {
        List<ClassStudentResponse> responseList = classService.findAllStudentByAccreditedClassId(classId);
        return ResponseEntity.ok(responseList);
    }

    /*@PostMapping("/accelerated-classes/add")
    public AcceleratedClassEntry addEntry(@RequestParam Long studentId, @RequestParam Long classId) {
        return classService.addEntry(studentId, classId);
    }*/

}
