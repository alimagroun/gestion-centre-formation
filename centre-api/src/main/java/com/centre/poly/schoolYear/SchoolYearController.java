package com.centre.poly.schoolYear;

import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.InvalidRequestException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("school-years")
@RequiredArgsConstructor
public class SchoolYearController {

    private final SchoolYearService schoolYearService;

    @PostMapping
    public ResponseEntity<Long> save(@Valid @RequestBody SchoolYearRequest request) {
        Long id = schoolYearService.save(request);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<PageResponse<SchoolYearResponse>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResponse<SchoolYearResponse> response = schoolYearService.findAll(page, size);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchoolYearResponse> findById(@PathVariable Long id) {
        SchoolYearResponse response = schoolYearService.findById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}/default")
    public ResponseEntity<Void> setDefault(@PathVariable Long id) {
        schoolYearService.toDefault(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
