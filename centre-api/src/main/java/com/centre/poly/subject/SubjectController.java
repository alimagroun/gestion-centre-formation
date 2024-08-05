package com.centre.poly.subject;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import com.centre.poly.common.PageResponse;

import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("subject")
@RequiredArgsConstructor
public class SubjectController {
	
	private final SubjectService subjectService;

	@PostMapping(consumes = "multipart/form-data")
	public ResponseEntity<Subject> saveSubject(
	        @RequestPart(value = "subject", required = false) Subject subject,
	        @RequestPart(value = "file", required = false) MultipartFile sourceFile,
	        Authentication authentication) {
        try {
            // Obtain the userId from the Authentication object
            String userId = authentication.getName();
            
            System.out.println(userId);

            // Call the service method to save the subject and file
            Subject savedSubject = subjectService.saveSubject(subject, sourceFile, userId);
            return ResponseEntity.ok(savedSubject);
        } catch (Exception e) {     	
            // Handle any errors that occur during the save operation
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
	@GetMapping
	public ResponseEntity<PageResponse<SubjectResponse>> getAllSubjects(
	        @RequestParam(name = "page", defaultValue = "0", required = false) int page,
	        @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
	    return ResponseEntity.ok().body(subjectService.getAllSubjects(page, size));
	}


}
