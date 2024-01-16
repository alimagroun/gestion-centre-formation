package com.centre.poly.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ResponseDto> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String message = "Parameter type error: " + ex.getName() + " should be of type " + ex.getRequiredType().getSimpleName();
    ResponseDto e =
        ResponseDto.builder()
            .httpCode(HttpStatus.OK.value())
                .code(ErrorCodes.PARAMS_NOT_VALID.toString())
            .message(message)
            .build();
        return new ResponseEntity<>(e, HttpStatus.OK);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ResponseDto> handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {
        String message = ex.getMessage();
        ResponseDto e =
                ResponseDto.builder()
                        .httpCode(HttpStatus.OK.value())
                        .code(ErrorCodes.PARAMS_REQUIRED.toString())
                        .message(message)
                        .build();
        return new ResponseEntity<>(e, HttpStatus.OK);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ResponseDto> handleNoResourceFoundException(NoResourceFoundException ex) {
        String message = ex.getMessage();
        ResponseDto e =
                ResponseDto.builder()
                        .httpCode(HttpStatus.OK.value())
                        .code(ErrorCodes.PARAMS_REQUIRED.toString())
                        .message(message)
                        .build();
        return new ResponseEntity<>(e, HttpStatus.OK);
    }
}
