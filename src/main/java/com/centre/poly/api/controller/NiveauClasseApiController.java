package com.centre.poly.api.controller;

import com.centre.poly.api.NiveauClasseApi;
import com.centre.poly.exception.ResponseDto;
import com.centre.poly.model.NiveauClasse;
import com.centre.poly.service.NiveauClasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NiveauClasseApiController implements NiveauClasseApi {

    @Autowired
    NiveauClasseService niveauClasseService;
    
    @Override
    public NiveauClasse save(NiveauClasse niveauClasse) {
        return niveauClasseService.save(niveauClasse);
    }

    @Override
    public List<NiveauClasse> findAll() {
        return niveauClasseService.findAll();
    }

    @Override
    public ResponseDto deleteByID(Long id) {
        return niveauClasseService.delete(id);
    }
}
