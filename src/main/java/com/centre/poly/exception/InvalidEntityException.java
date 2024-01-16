package com.centre.poly.exception;

import lombok.Getter;

import java.util.List;

public class InvalidEntityException extends RuntimeException{

    @Getter
    private String errorCode;

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

    public InvalidEntityException(String message , Throwable cause , String errorCode) {
        super(message , cause);
        this.errorCode = errorCode;
    }

    public InvalidEntityException(String message , String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public InvalidEntityException(String message , List<String> errors) {
        super(message);
        this.errors = errors;
    }

    public InvalidEntityException(String message , String errorCodes , List<String> errors) {
        super(message);
        this.errorCode = errorCodes;
        this.errors = errors;
    }
}