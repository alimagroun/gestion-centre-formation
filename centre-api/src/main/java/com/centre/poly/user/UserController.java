package com.centre.poly.user;

import com.centre.poly.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {
    
    private final UserService userService;
    
    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<PageResponse<UserResponse>> findAllUsers(@RequestParam(name = "page",
                                                                                 defaultValue = "0",
                                                                                 required = false) int page,
                                                                   @RequestParam(name = "size",
                                                                                 defaultValue = "10",
                                                                                 required = false) int size) {
        return ResponseEntity.ok(userService.findAll(page, size));
    }
}
