package com.centre.poly.service.impl;

import com.centre.poly.exception.InvalidEntityException;
import com.centre.poly.dto.ResponseDto;
import com.centre.poly.model.NiveauClasse;
import com.centre.poly.repository.NiveauClasseRepository;
import com.centre.poly.service.NiveauClasseService;
import com.centre.poly.validator.NiveauClasseValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.centre.poly.exception.Codes;

import java.util.List;

@Service
@Slf4j
public class NiveauClasseServiceImpl implements NiveauClasseService {

    @Autowired
    private NiveauClasseRepository niveauClasseRepository;


    @Override
    public ResponseDto save(NiveauClasse niveauClasse) {

        List<String> erreurs = NiveauClasseValidator.validate(niveauClasse);

        if(!erreurs.isEmpty()){
            throw new InvalidEntityException("Le Niveau classe n'est pas valide", Codes.NIVEAU_CLASSE_NOT_VALID, erreurs);
        }

        if(existsByNom(niveauClasse.getNom())){
      throw new InvalidEntityException(
          "Le NiveauClasse n'est pas valide",
          Codes.NIVEAU_CLASSE_NOT_VALID,
          List.of("NAME_EXISTS"));
        }

        niveauClasseRepository.save(niveauClasse);

        return ResponseDto.builder().httpCode(200).code(Codes.SUCCESS).build();

    }

    @Override
    public List<NiveauClasse> findAll() {

        List<NiveauClasse> niveauClasses = niveauClasseRepository.findAll();
        return niveauClasses;
    }

    @Override
    public ResponseDto delete(Long id) {
        if(id == null){
            throw new InvalidEntityException("ID_REQUIRED");
        }

        niveauClasseRepository.deleteById(id);
        return ResponseDto.builder().httpCode(200).code(Codes.SUCCESS).isError(false)
        .build();
    }

    private boolean existsByNom(String nom) {
        NiveauClasse niveauClasse = niveauClasseRepository.getNiveauClasseByNom(nom);
        if(niveauClasse == null){
            return false;
        }else{
            return true;
        }
    }
}
