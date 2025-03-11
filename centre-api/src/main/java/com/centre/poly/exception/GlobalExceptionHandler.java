package com.centre.poly.exception;

import static com.centre.poly.exception.ErrorCode.*;
import static com.centre.poly.exception.ErrorCode.NOT_FOUND;
import static org.springframework.http.HttpStatus.*;

import com.centre.poly.registration.exception.ValidationParentException;
import java.util.HashSet;
import java.util.Set;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(LockedException.class)
  public ResponseEntity<ExceptionResponse> handleException(LockedException exp) {
    return ResponseEntity.status(UNAUTHORIZED)
        .body(
            ExceptionResponse.builder()
                .errorCode(ACCOUNT_LOCKED.getCode())
                .errorMessage(ACCOUNT_LOCKED.getDescription())
                .errorDescription(exp.getMessage())
                .build());
  }

  @ExceptionHandler(DuplicateEntityException.class)
  public ResponseEntity<ExceptionResponse> handleDuplicateException(DuplicateEntityException exp) {
    return ResponseEntity.status(DUPLICATE_ENTITY.getHttpStatus())
        .body(
            ExceptionResponse.builder()
                .errorCode(DUPLICATE_ENTITY.getCode())
                .errorMessage(DUPLICATE_ENTITY.getDescription())
                .errorDescription(exp.getMessage())
                .build());
  }

  @ExceptionHandler(InvalidRequestException.class)
  public ResponseEntity<ExceptionResponse> handleInvalidRequestException(
      InvalidRequestException exp) {
    return ResponseEntity.status(INVALID_REQUEST.getHttpStatus())
        .body(
            ExceptionResponse.builder()
                .errorCode(INVALID_REQUEST.getCode())
                .errorMessage(INVALID_REQUEST.getDescription())
                .errorDescription(exp.getMessage())
                .errors(exp.getErrorMessages())
                .build());
  }

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ExceptionResponse> notFoundException(NotFoundException exp) {
    return ResponseEntity.status(NOT_FOUND.getHttpStatus())
        .body(
            ExceptionResponse.builder()
                .errorCode(NOT_FOUND.getCode())
                .errorMessage(NOT_FOUND.getDescription())
                .errorDescription(exp.getMessage())
                .build());
  }

  @ExceptionHandler(ValidationParentException.class)
  public ResponseEntity<ExceptionResponse> validationParentException(
      ValidationParentException exp) {
    return ResponseEntity.status(NOT_FOUND.getHttpStatus())
        .body(
            ExceptionResponse.builder()
                .errorCode(NOT_FOUND.getCode())
                .errorMessage(NOT_FOUND.getDescription())
                .errorDescription(exp.getErrors().toString())
                .build());
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(DisabledException.class)
  public ResponseEntity<ExceptionResponse> handleException(DisabledException exp) {
    return ResponseEntity.status(UNAUTHORIZED)
        .body(
            ExceptionResponse.builder()
                .errorCode(ACCOUNT_DISABLED.getCode())
                .errorMessage(ACCOUNT_DISABLED.getDescription())
                .errorDescription(exp.getMessage())
                .build());
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ExceptionResponse> handleException() {
    return ResponseEntity.status(UNAUTHORIZED)
        .body(
            ExceptionResponse.builder()
                .errorCode(BAD_CREDENTIALS.getCode())
                .errorMessage(BAD_CREDENTIALS.getDescription())
                .build());
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException exp) {
    Set<String> errors = new HashSet<>();
    exp.getBindingResult()
        .getAllErrors()
        .forEach(
            error -> {
              var errorMessage = error.getDefaultMessage();
              errors.add(errorMessage);
            });

    return ResponseEntity.status(BAD_REQUEST)
        .body(ExceptionResponse.builder().validationErrors(errors).build());
  }

  // Cette méthode gère toutes les autres exceptions qui n'ont pas été traitées par les méthodes
  // précédentes
  @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
  public ResponseEntity<ExceptionResponse> handleException(Exception exp) {
    exp.printStackTrace();
    return ResponseEntity.status(INTERNAL_SERVER_ERROR)
        .body(
            ExceptionResponse.builder()
                .errorMessage("Internal error, please contact the admin : " + exp.getMessage())
                .errorDescription(exp.getMessage())
                .build());
  }
}
