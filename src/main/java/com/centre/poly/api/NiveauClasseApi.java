package com.centre.poly.api;

import com.centre.poly.exception.ResponseDto;
import com.centre.poly.model.NiveauClasse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface NiveauClasseApi {
    @PostMapping(value = "niveauClasse/create" , consumes = MediaType.APPLICATION_JSON_VALUE , produces = MediaType.APPLICATION_JSON_VALUE)
    NiveauClasse save(@RequestBody NiveauClasse niveauClasse);

    @GetMapping(value = "niveauClasse/findAll")
    List<NiveauClasse> findAll();

    @DeleteMapping(value = "niveauClasse/deleteById")
    ResponseDto deleteByID(@RequestParam("id") Long id);
}
