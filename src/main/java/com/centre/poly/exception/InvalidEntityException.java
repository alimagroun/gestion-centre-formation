package com.centre.poly.exception;

import lombok.Getter;

import java.util.List;

public class InvalidEntityException extends RuntimeException{

    @Getter
    private Codes errorCode;

    @Getter
    private List<String> errors;

    public InvalidEntityException(String message) {
        super(message);
    }

    public InvalidEntityException(List<String> errors) {
        this.errors = errors;
    }


    public InvalidEntityException(String message , Throwable cause) {
        super(message ,cause);
    }

    public InvalidEntityException(String message , Throwable cause , Codes errorCode) {
        super(message , cause);
        this.errorCode = errorCode;
    }

    public InvalidEntityException(String message , Codes errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public InvalidEntityException(String message , List<String> errors) {
        super(message);
        this.errors = errors;
    }

    public InvalidEntityException(String message , Codes errorCodes , List<String> errors) {
        super(message);
        this.errorCode = errorCodes;
        this.errors = errors;
    }
}