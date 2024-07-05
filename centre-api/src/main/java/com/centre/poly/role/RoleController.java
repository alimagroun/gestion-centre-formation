package com.centre.poly.role;

import com.centre.poly.common.PageResponse;
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
    public ResponseEntity<PageResponse<RoleResponse>> findAll(
            @RequestParam(name = "page", defaultValue = "0",
                    required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        return ResponseEntity.ok().body(roleService.findAll(page, size));
    }

}
