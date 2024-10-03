package com.centre.poly.classmanagement.controller;

import com.centre.poly.classmanagement.dto.SpecialtyRequest;
import com.centre.poly.classmanagement.dto.SpecialtyResponse;
import com.centre.poly.classmanagement.service.SpecialtyService;
import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("specialty")
@RequiredArgsConstructor
public class SpecialtyController {

    private final SpecialtyService specialtyService;

    @PostMapping
    public ResponseEntity<Long> saveSpecialty(@Valid @RequestBody SpecialtyRequest request) {
        return ResponseEntity.ok().body(specialtyService.save(request));
    }

    @GetMapping
    public ResponseEntity<PageResponse<SpecialtyResponse>> findAllSpecialtyPageable(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok().body(specialtyService.findAllPageable(page, size));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<SpecialtyResponse>> findAll(){
        return ResponseEntity.ok().body(specialtyService.findAll());
    }
}
