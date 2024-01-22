package com.centre.poly.exception;

public enum Codes {

    SUCCESS(0),
    PARAMS_NOT_VALID(1),
    PARAMS_REQUIRED(2),
    NIVEAU_CLASSE_NOT_VALID(10),
    DISCIPLINE_NOT_VALID(20);
    private int code;

    Codes(int code){
        this.code=code;
    }

    public int getCode() {
        return code;
    }

}
