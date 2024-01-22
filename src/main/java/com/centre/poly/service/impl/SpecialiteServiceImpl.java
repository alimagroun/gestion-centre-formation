package com.centre.poly.service.impl;

import com.centre.poly.exception.Codes;
import com.centre.poly.exception.InvalidEntityException;
import com.centre.poly.dto.ResponseDto;
import com.centre.poly.model.Specialite;
import com.centre.poly.repository.SpecialiteRepository;
import com.centre.poly.service.SpecialiteService;
import com.centre.poly.validator.SpecialiteValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SpecialiteServiceImpl implements SpecialiteService {

    @Autowired
    SpecialiteRepository disciplineRepository;

    @Override
    public ResponseDto save(Specialite discipline) {

        List<String> errors = SpecialiteValidator.validate(discipline);
        if(!errors.isEmpty()){
            throw new InvalidEntityException("Le Niveau classe n'est pas valide", Codes.DISCIPLINE_NOT_VALID, errors);
        }
    return ResponseDto.builder().build();
    }

    @Override
    public ResponseDto delete(Long id) {
        return null;
    }
}
