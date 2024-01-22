package com.centre.poly.dto;

import com.centre.poly.exception.Codes;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
public class ResponseDto<T> {

    private int httpCode;

    private T data;

    String message;

    Codes code;

    @JsonProperty("isError")
    private boolean isError = false;

    private List<String> errors = new ArrayList<>();
}
