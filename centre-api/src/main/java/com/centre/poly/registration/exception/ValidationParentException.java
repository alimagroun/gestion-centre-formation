package com.centre.poly.registration.exception;

import java.util.List;

public class ValidationParentException extends RuntimeException {
    private final List<String> errors;

    public ValidationParentException(List<String> errors) {
        super("Validation failed");
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;
    }
}