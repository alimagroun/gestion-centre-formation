package com.centre.poly.classmanagement.controller;

import com.centre.poly.classmanagement.dto.ClasseFormationRequest;
import com.centre.poly.classmanagement.dto.ClasseFormationResponse;
import com.centre.poly.classmanagement.service.ClasseFormationService;
import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("classe")
public class ClasseFormationController {

    private final ClasseFormationService classeFormationService;

    @PostMapping
    public ResponseEntity<Long> saveClasse(@RequestBody @Valid ClasseFormationRequest request) {
        return new ResponseEntity<>(classeFormationService.save(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<PageResponse<ClasseFormationResponse>> findAllClasses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return new ResponseEntity<>(classeFormationService.findAll(page, size), HttpStatus.OK);
    }
}
