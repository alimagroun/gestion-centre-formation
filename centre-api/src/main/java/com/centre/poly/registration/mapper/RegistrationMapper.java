package com.centre.poly.registration.mapper;

import com.centre.poly.registration.dto.*;
import com.centre.poly.registration.entity.Registration;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RegistrationMapper {

  public RegistrationResponse toResponse(Registration registration) {

    return RegistrationResponse.builder()
        .id(registration.getId())
        .status(registration.getStatus())
        .createdDate(registration.getCreatedDate())
        .studentId(registration.getStudent().getId())
        .fullNameStudent(
            registration.getStudent().getFirstName()
                + ' '
                + registration.getStudent().getLastName())
        .specialtyId(registration.getSpecialty().getId())
        .specialtyName(
            registration.getSpecialty().getFormationType().getName()
                + "-"
                + registration.getSpecialty().getDomaine().getName())
        .build();
  }

  public RegistrationDetailsResponse toRegistrationResponse(Registration registration) {

    RegistrationDetailsResponse details = new RegistrationDetailsResponse();
    details.setId(registration.getId());
    details.setStatus(registration.getStatus());
    details.setCreatedDate(registration.getCreatedDate());
    details.setRemarks(registration.getRemarks());
    details.setRegistrationFees(registration.getRegistrationFees());
    details.setSpecialtyName(
        registration.getSpecialty().getFormationType().getName()
            + "-"
            + registration.getSpecialty().getDomaine().getName());
    details.setSpecialtyId(registration.getSpecialty().getId());
    details.setIsAffected(registration.getIsAffected());
    details.setStatusChangeReason(registration.getStatusChangeReason());

    details.setStudent(
        StudentDetails.builder()
            .id(registration.getStudent().getId())
            .fullName(
                registration.getStudent().getFirstName()
                    + ' '
                    + registration.getStudent().getLastName())
            .dateOfBirth(registration.getStudent().getBirthDate())
            .levelOfEducation(registration.getStudent().getLevelOfEducation())
            .phoneNumber(registration.getStudent().getPhoneNumber())
            .email(registration.getStudent().getEmail())
            .identityNumber(registration.getStudent().getIdentityNumber())
            .build());

    if (registration.getStudent().getMother() != null) {
      details.setMother(
          ParentDetails.builder()
              .id(registration.getStudent().getMother().getId())
              .fullName(
                  registration.getStudent().getMother().getFirstName()
                      + " "
                      + registration.getStudent().getMother().getLastName())
              .profession(registration.getStudent().getMother().getProfession())
              .phoneNumber(registration.getStudent().getMother().getPhoneNumber())
              .email(registration.getStudent().getMother().getEmail())
              .isDeceased(registration.getStudent().getMother().getIsDeceased())
              .maritalStatus(registration.getStudent().getMother().getMaritalStatus())
              .build());
    }

    if (registration.getStudent().getFather() != null) {
      details.setFather(
          ParentDetails.builder()
              .id(registration.getStudent().getFather().getId())
              .fullName(
                  registration.getStudent().getFather().getFirstName()
                      + ' '
                      + registration.getStudent().getFather().getLastName())
              .profession(registration.getStudent().getFather().getProfession())
              .phoneNumber(registration.getStudent().getFather().getPhoneNumber())
              .email(registration.getStudent().getFather().getEmail())
              .isDeceased(registration.getStudent().getFather().getIsDeceased())
              .maritalStatus(registration.getStudent().getFather().getMaritalStatus())
              .build());
    }

    details.setAddress(
        Address.builder()
            .city(registration.getStudent().getAddress().getCity())
            .zipCode(registration.getStudent().getAddress().getZipCode())
            .street(registration.getStudent().getAddress().getStreet())
            .build());

    // Documents
    List<DocumentRegistrationResponse> documents = new ArrayList<>();
    registration
        .getRegistrationDocumentEntries()
        .forEach(
            d -> {
              DocumentRegistrationResponse doc = new DocumentRegistrationResponse();
              doc.setId(d.getId());
              doc.setDescription(d.getDocument().getDescription());
              doc.setName(d.getDocument().getName());
              documents.add(doc);
            });
    details.setDocumentRegistrationResponseList(documents);

    return details;
  }
}
