package com.centre.poly.validator;

import com.centre.poly.model.Discipline;

import java.util.ArrayList;
import java.util.List;

public class DisciplineValidator {

    public static List<String> validate(Discipline ob) {
        List<String> errors = new ArrayList<>();

        // Validation du nom du produit
        if (ob.getNom().isEmpty()) {
            errors.add("NAME_REQUIRED");
        }

        return errors;
    }
}
