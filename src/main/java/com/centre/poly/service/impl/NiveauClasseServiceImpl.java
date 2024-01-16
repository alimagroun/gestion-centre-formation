package com.centre.poly.service.impl;

import com.centre.poly.exception.InvalidEntityException;
import com.centre.poly.exception.ResponseDto;
import com.centre.poly.model.NiveauClasse;
import com.centre.poly.repository.NiveauClasseRepository;
import com.centre.poly.service.NiveauClasseService;
import com.centre.poly.validator.NiveauClasseValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.centre.poly.exception.ErrorCodes;

import java.util.List;

@Service
@Slf4j
public class NiveauClasseServiceImpl implements NiveauClasseService {

    @Autowired
    private NiveauClasseRepository niveauClasseRepository;


    @Override
    public NiveauClasse save(NiveauClasse niveauClasse) {

        List<String> erreurs = NiveauClasseValidator.validate(niveauClasse);

        if(!erreurs.isEmpty()){
            throw new InvalidEntityException("Le Niveau classe n'est pas valide", ErrorCodes.NIVEAU_CLASSE_NOT_VALID.toString(), erreurs);
        }

        if(existsByNom(niveauClasse.getNom())){
      throw new InvalidEntityException(
          "Le NiveauClasse n'est pas valide",
          ErrorCodes.NIVEAU_CLASSE_NOT_VALID.toString(),
          List.of("NAME_EXISTS"));
        }

        return niveauClasseRepository.save(niveauClasse);

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
        return ResponseDto.builder().httpCode(200).message("SUCCESS").code(ErrorCodes.SUCCESS.toString())
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
