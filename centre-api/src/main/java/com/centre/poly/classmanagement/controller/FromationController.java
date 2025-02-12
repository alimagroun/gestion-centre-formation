package com.centre.poly.classmanagement.controller;

import com.centre.poly.classmanagement.dto.FormationTypeRequest;
import com.centre.poly.classmanagement.dto.FormationTypeResponse;
import com.centre.poly.classmanagement.service.FormationTypeService;
import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("formation")
public class FromationController {
    
    private final FormationTypeService formationTypeService;
    
    @PostMapping
    public ResponseEntity<Long> saveFormation(@Valid @RequestBody FormationTypeRequest request) {
        return ResponseEntity.ok()
                             .body(formationTypeService.save(request));
    }
    
    @GetMapping
    public ResponseEntity<PageResponse<FormationTypeResponse>> findAllFormation(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok()
                             .body(formationTypeService.findAllPageabale(page, size));
    }
    
    @GetMapping(value = "/allList")
    public ResponseEntity<List<FormationTypeResponse>> findAllFormationsList() {
        return ResponseEntity.ok()
                             .body(formationTypeService.findAll());
    }
    
    
}
