package com.centre.poly.classmanagement.controller;

import com.centre.poly.classmanagement.dto.FormationRequest;
import com.centre.poly.classmanagement.dto.FormationResponse;
import com.centre.poly.classmanagement.service.FormationService;
import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("formation")
public class FromationController {

    private final FormationService formationService;

    @PostMapping
    public ResponseEntity<Long> saveFormation(@Valid @RequestBody FormationRequest request) {
        return ResponseEntity.ok().body(formationService.save(request));
    }

    @GetMapping
    public ResponseEntity<PageResponse<FormationResponse>> findAllFormation(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "10") int size
    ){
        return ResponseEntity.ok().body(formationService.findAll(page, size));
    }


}
