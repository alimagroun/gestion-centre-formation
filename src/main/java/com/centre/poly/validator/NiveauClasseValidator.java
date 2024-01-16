package com.centre.poly.validator;

import com.centre.poly.model.Classe;
import com.centre.poly.model.NiveauClasse;

import java.util.ArrayList;
import java.util.List;

public class NiveauClasseValidator {

    public static List<String> validate(NiveauClasse ob) {
        List<String> errors = new ArrayList<>();

        if (ob.getNom().isEmpty()) {
            errors.add("NAME_REQUIRED");
        }

        return errors;
    }
}
