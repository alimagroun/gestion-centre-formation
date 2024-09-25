package com.centre.poly.classmanagement.controller;

import com.centre.poly.classmanagement.dto.DomaineRequest;
import com.centre.poly.classmanagement.dto.DomaineResponse;
import com.centre.poly.classmanagement.service.DomaineService;
import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("domaine")
public class DomaineController {

    private final DomaineService domaineService;

    @PostMapping
    public ResponseEntity<Long> saveDomain(@Valid @RequestBody DomaineRequest request) {
        return ResponseEntity.ok().body(domaineService.save(request));
    }

    @GetMapping
    public ResponseEntity<PageResponse<DomaineResponse>> findAllDomain(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size
    ){
        return ResponseEntity.ok().body(domaineService.findAll(page, size));
    }


}
