package com.centre.poly.registration.dto;

import com.centre.poly.registration.exception.ValidationParentException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

public record RegistrationRequest(

        ParentRequest motherRequest,
        ParentRequest fatherRequest,

        @Valid
        StudentRequest studentRequest,
        @Valid
        AddressRequest addressRequest,

        @NotNull(message = "REGISTRATION_FEES_NOT_NULL")
        Double registrationFees,

        @NotNull(message = "SPECIALTY_ID_NOT_NULL")
        Long specialtyId,

        String remarks,
        List<Long> documents
) {

        public void validateParents() {
                List<String> errors = new ArrayList<>();
                if(!motherRequest.isChecked() && !fatherRequest.isChecked()){
                        errors.add("AT_LEAST_ONE_PARENT_REQUIRED");
                        throw new ValidationParentException(errors);
                }
                if (motherRequest.isChecked()) {
                        motherRequest.validate();
                }

                if (fatherRequest.isChecked()) {
                        fatherRequest.validate();
                }

        }
}
