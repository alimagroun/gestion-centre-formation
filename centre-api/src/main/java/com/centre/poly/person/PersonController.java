package com.centre.poly.person;

import com.centre.poly.person.dto.ParentResponse;
import com.centre.poly.person.dto.RegistrationRequest;
import com.centre.poly.person.model.Parent;
import com.centre.poly.person.model.Person;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("person")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService service;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<Integer> savePerson(@RequestBody RegistrationRequest request) {
        return ResponseEntity.ok().body(service.save(request));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/findParentByNum")
    public ResponseEntity<ParentResponse> findParentByNum(@RequestParam("num") String num) {
        return ResponseEntity.ok().body(service.findParentByNum(num));
    }

}
