package com.centre.poly.role;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("role")
@RequiredArgsConstructor
public class RoleController {

    public final RoleService roleService;

    @PostMapping
    public ResponseEntity<Integer> save(@RequestBody @Valid RoleRequest request) {
       return ResponseEntity.ok().body(roleService.save(request));
    }

    @GetMapping
    public ResponseEntity<List<RoleResponse>> findAll() {
        return ResponseEntity.ok().body(roleService.findAll());
    }

}
