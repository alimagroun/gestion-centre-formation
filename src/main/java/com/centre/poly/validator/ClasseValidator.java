package com.centre.poly.validator;

import com.centre.poly.model.Classe;

import java.util.ArrayList;
import java.util.List;

public class ClasseValidator {

    public static List<String> validate(Classe ob) {
        List<String> errors = new ArrayList<>();

        if (ob.getDiscipline() == null) {
            errors.add("Discipline est obligatoire");
        }

        if (ob.getNiveauClasse() == null) {
            errors.add("Niveau classe est obligatoire");
        }

        return errors;
    }
}
