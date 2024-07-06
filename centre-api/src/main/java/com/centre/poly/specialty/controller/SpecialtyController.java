package com.centre.poly.specialty.controller;

import com.centre.poly.common.PageResponse;
import com.centre.poly.specialty.dto.FormationRequest;
import com.centre.poly.specialty.dto.FormationResponse;
import com.centre.poly.specialty.dto.SpecialtyRequest;
import com.centre.poly.specialty.dto.SpecialtyResponse;
import com.centre.poly.specialty.service.FormationService;
import com.centre.poly.specialty.service.SpecialtyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("specialty")
public class SpecialtyController {


    private final SpecialtyService service;

    @PostMapping
    public ResponseEntity<Integer> create(@RequestBody @Valid SpecialtyRequest request) {
        return ResponseEntity.ok().body(service.create(request));
    }

    @GetMapping
    public ResponseEntity<PageResponse<SpecialtyResponse>> findAllFormations(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ){
        return ResponseEntity.ok(service.findAll(page, size));
    }
}
