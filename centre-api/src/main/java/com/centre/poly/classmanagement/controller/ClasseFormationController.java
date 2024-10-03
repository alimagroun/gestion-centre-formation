package com.centre.poly.classmanagement.controller;

import com.centre.poly.classmanagement.dto.*;
import com.centre.poly.classmanagement.service.ClassService;
import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("classe")
public class ClasseFormationController {

    private final ClassService classService;

    @PostMapping("/accredited-classes")
    public ResponseEntity<Long> saveAccreditedClass(@RequestBody @Valid AccreditedClassRequest request) {
        return new ResponseEntity<>(classService.saveAccreditedClass(request), HttpStatus.CREATED);
    }

    @PostMapping("/accelerated-classes")
    public ResponseEntity<Long> saveAcceleratedClass(@RequestBody @Valid AcceleratedClassRequest request) {
        return new ResponseEntity<>(classService.saveAcceleratedClass(request), HttpStatus.CREATED);
    }

    @GetMapping("/accredited-classes")
    public ResponseEntity<PageResponse<AccreditedClassResponse>> findAllAccreditedClass(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return new ResponseEntity<>(classService.findAllAccreditedClass(page, size), HttpStatus.OK);
    }

    @GetMapping("/accelerated-classes")
    public ResponseEntity<PageResponse<AcceleratedClassResponse>> findAllAcceleratedClass(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return new ResponseEntity<>(classService.findAllAcceleratedClass(page, size), HttpStatus.OK);
    }

}