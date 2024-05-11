package com.poly.classroom;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("classroom")
@RequiredArgsConstructor
@Tag(name = "classRoom")
public class ClassRoomController {

    private final ClassRoomService service;

    @PostMapping("/save")
    public ResponseEntity<Long> save(@Valid @RequestBody ClassRoomRequest classRoomRequest, Authentication connectedUser) {
        return ResponseEntity.ok(service.save(classRoomRequest,connectedUser));
    }
}
