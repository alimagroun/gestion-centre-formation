package com.centre.poly.subject;

import com.centre.poly.common.ApiResponse;
import com.centre.poly.exception.NotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("subject")
@RequiredArgsConstructor
public class SubjectController {

  private final SubjectService subjectService;
  private final ObjectMapper objectMapper;

  @PostMapping(consumes = {"multipart/form-data"})
  public ResponseEntity<ApiResponse> createSubject(
      @RequestPart("subject") String subjectRequestJson,
      @RequestPart(value = "file", required = false) MultipartFile file)
      throws IOException {

    SubjectRequest subjectRequest =
        objectMapper.readValue(subjectRequestJson, SubjectRequest.class);

    Long id = subjectService.save(subjectRequest, file);

    return ResponseEntity.status(HttpStatus.CREATED)
        .body(
            ApiResponse.builder()
                .success(true)
                .message("success")
                .status(HttpStatus.CREATED.value())
                .build());
  }

  /*@GetMapping
  public ResponseEntity<PageResponse<SubjectResponse>> getAllSubjects(
      @RequestParam(name = "page", defaultValue = "0", required = false) int page,
      @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
    return ResponseEntity.ok().body(subjectService.getAllSubjects(page, size));
  }*/
}
