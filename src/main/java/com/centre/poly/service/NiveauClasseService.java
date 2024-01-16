package com.centre.poly.service;

import com.centre.poly.exception.ResponseDto;
import com.centre.poly.model.NiveauClasse;

import java.util.List;

public interface NiveauClasseService {

    NiveauClasse save(NiveauClasse niveauClasse);

    List<NiveauClasse> findAll();

    ResponseDto delete (Long id);
}
