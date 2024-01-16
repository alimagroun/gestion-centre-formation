package com.centre.poly.exception;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
public class ResponseDto {

    private Integer httpCode;

    private String code;

    private String message;

    private List<String> errors = new ArrayList<>();
}
