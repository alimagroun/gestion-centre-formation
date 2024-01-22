package com.centre.poly.service;

import com.centre.poly.dto.ResponseDto;
import com.centre.poly.model.NiveauClasse;

import java.util.List;

public interface NiveauClasseService {

    ResponseDto save(NiveauClasse niveauClasse);

    List<NiveauClasse> findAll();

    ResponseDto delete (Long id);
}
