package com.centre.poly.subject;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.centre.poly.common.PageResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("subject")
@RequiredArgsConstructor
public class SubjectController {
    
    private final SubjectService subjectService;
    
    @GetMapping
    public ResponseEntity<PageResponse<SubjectResponse>> getAllSubjects(
            @RequestParam(name = "page",
                          defaultValue = "0",
                          required = false) int page,
            @RequestParam(name = "size",
                          defaultValue = "10",
                          required = false) int size) {
        return ResponseEntity.ok()
                             .body(subjectService.getAllSubjects(page, size));
    }
    
    
}
