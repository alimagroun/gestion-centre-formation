package com.centre.poly.person.controller;

import com.centre.poly.person.dto.ParentResponse;
import com.centre.poly.person.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("person")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    @GetMapping(value = "/validation/phone-number")
    public ResponseEntity<Boolean> phoneNumberValidation(@RequestParam String phoneNumber) {
        return ResponseEntity.ok().body(personService.isPhoneNumberUnique(phoneNumber));
    }

    @GetMapping(value = "/validation/email")
    public ResponseEntity<Boolean> emailValidation(@RequestParam String email) {
        return ResponseEntity.ok().body(personService.isEmailUnique(email));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/findParentByNum")
    public ResponseEntity<ParentResponse> findParentByNum(@RequestParam("num") String num) {
        return ResponseEntity.ok().body(personService.findParentByNum(num));
    }
}
