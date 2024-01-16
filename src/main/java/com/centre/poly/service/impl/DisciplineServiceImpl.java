package com.centre.poly.service.impl;

import com.centre.poly.exception.ErrorCodes;
import com.centre.poly.exception.InvalidEntityException;
import com.centre.poly.model.Discipline;
import com.centre.poly.repository.DisciplineRepository;
import com.centre.poly.service.DisciplineService;
import com.centre.poly.validator.DisciplineValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class DisciplineServiceImpl implements DisciplineService {

    @Autowired
    DisciplineRepository disciplineRepository;

    @Override
    public Discipline save(Discipline discipline) {

        List<String> errors = DisciplineValidator.validate(discipline);
        if(!errors.isEmpty()){
            throw new InvalidEntityException("Le Niveau classe n'est pas valide", ErrorCodes.DISCIPLINE_NOT_VALID.toString(), errors);
        }
        return null;
    }
}
