package com.centre.poly.subject;

import java.util.HashMap;
import java.util.Map;

public record SubjectRequest(
    String name,
    String description,
    int totalHours,
    int theoreticalHours,
    int practicalHours,
    Long specialtyId) {

  public static Map<String, String> validate(SubjectRequest subjectRequest) {
    Map<String, String> errors = new HashMap<>();

    if (subjectRequest.name() == null || subjectRequest.name().trim().isEmpty()) {
      errors.put("name", "NAME_REQUIRED");
    } else if (subjectRequest.name().length() < 3) {
      errors.put("name", "NAME_MUST_BE_AT_LEAST_3_CHARACTERS");
    }

    if ((subjectRequest.description() != null && !subjectRequest.description.isEmpty())
        && subjectRequest.description().length() < 5) {
      errors.put("description", "DESCRIPTION_MUST_BE_AT_LEAST_5_CHARACTERS");
    }

    if (subjectRequest.specialtyId() == null) {
      errors.put("specialty", "SPECIALTY_ID_REQUIRED");
    }

    return errors;
  }
}
