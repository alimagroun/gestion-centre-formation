package com.centre.poly.registration.dto;

import com.centre.poly.person.entity.MaritalStatus;
import com.centre.poly.person.entity.ParentType;
import com.centre.poly.registration.exception.ValidationParentException;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public record ParentRequest(
        Integer id,
        String firstName,
        String lastName,
        String phoneNumber,
        String email,
        ParentType type,
        MaritalStatus maritalStatus,
        Boolean isDeceased,
        String profession,
        boolean isChecked
    ) {

    private static final Pattern EMAIL_REGEX = Pattern.compile(
            "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$",
            Pattern.CASE_INSENSITIVE);

    public void validate() {
        List<String> errors = new ArrayList<>();

        if (firstName == null || firstName.isEmpty()) {
            errors.add("PARENT_FIRST_NAME_REQUIRED");
        }
        if (lastName == null || lastName.isEmpty()) {
            errors.add("PARENT_LAST_NAME_REQUIRED");
        }
        if (phoneNumber == null || phoneNumber.isEmpty() || phoneNumber.length() != 8) {
            errors.add("PARENT_PHONE_NUMBER_SIZE_MUST_BE_8");
        }
        if (!email.isEmpty() && !EMAIL_REGEX.matcher(email).matches()) {
            errors.add("PARENT_EMAIL_NOT_VALID");
        }
        if (type == null) {
            errors.add("TYPE_REQUIRED");
        }
        if (maritalStatus == null) {
            errors.add("MARTITAL_STATUS_REQUIRED");
        }
        if (isDeceased == null) {
            errors.add("isDeceased_REQUIRED");
        }

        if (!errors.isEmpty()) {
            throw new ValidationParentException(errors);
        }
    }
}
