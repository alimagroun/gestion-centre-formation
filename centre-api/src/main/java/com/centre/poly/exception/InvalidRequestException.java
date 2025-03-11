package com.centre.poly.exception;

import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvalidRequestException extends RuntimeException {

  private Map<String, String> errorMessages;

  public InvalidRequestException(String message) {
    super(message);
  }

  public InvalidRequestException(Map<String, String> errorMessages) {
    this.errorMessages = errorMessages;
  }
}
