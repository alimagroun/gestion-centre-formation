package com.centre.poly.registration.mapper;

import com.centre.poly.person.dto.ParentResponse;
import com.centre.poly.registration.dto.*;
import com.centre.poly.registration.entity.Registration;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RegistrationMapper {

    public RegistrationResponse toResponse(Registration registration) {

        return RegistrationResponse.builder().id(registration.getId()).status(registration.getStatus()).createdDate(registration.getCreatedDate()).fullNameStudent(registration.getStudent().getFirstName() + ' ' + registration.getStudent().getLastName()).specialtyName(registration.getSpecialty().getFormationType().getName()+"-"+registration.getSpecialty().getDomaine().getName()).build();
    }

    public RegistrationDetailsResponse toRegistrationResponse(Registration registration) {

        RegistrationDetailsResponse details = new RegistrationDetailsResponse();
        details.setId(registration.getId());
        details.setStatus(registration.getStatus());
        details.setCreatedDate(registration.getCreatedDate());
        details.setRemarks(registration.getRemarks());
        details.setRegistrationFees(registration.getRegistrationFees());
        details.setSpecialtyName(registration.getSpecialty().getFormationType().getName()+"-"+registration.getSpecialty().getDomaine().getName());

        details.setStudent(
                StudentDetails.builder()
                        .id(registration.getId())
                        .fullName(registration.getStudent().getFirstName() + ' ' + registration.getStudent().getLastName())
                        .levelOfEducation(registration.getStudent().getLevelOfEducation())
                        .phoneNumber(registration.getStudent().getPhoneNumber())
                        .email(registration.getStudent().getEmail())
                        .build()
        );

        details.setMother(
                ParentDetails.builder()
                        .id(registration.getStudent().getMother().getId())
                        .fullName(registration.getStudent().getMother().getFirstName() + ' ' + registration.getStudent().getMother().getLastName())
                        .profession(registration.getStudent().getMother().getProfession())
                        .phoneNumber(registration.getStudent().getMother().getPhoneNumber())
                        .email(registration.getStudent().getMother().getEmail())
                        .isDeceased(registration.getStudent().getMother().getIsDeceased())
                        .maritalStatus(registration.getStudent().getMother().getMaritalStatus())
                        .build()
        );

        details.setFather(
                ParentDetails.builder()
                        .id(registration.getStudent().getFather().getId())
                        .fullName(registration.getStudent().getFather().getFirstName() + ' ' + registration.getStudent().getFather().getLastName())
                        .profession(registration.getStudent().getFather().getProfession())
                        .phoneNumber(registration.getStudent().getFather().getPhoneNumber())
                        .email(registration.getStudent().getFather().getEmail())
                        .isDeceased(registration.getStudent().getFather().getIsDeceased())
                        .maritalStatus(registration.getStudent().getFather().getMaritalStatus())
                        .build()
        );

        details.setAddress(
                Address.builder()
                        .city(registration.getStudent().getAddress().getCity())
                        .zipCode(registration.getStudent().getAddress().getZipCode())
                        .street(registration.getStudent().getAddress().getStreet())
                        .build()
        );


        //Documents
        List<DocumentRegistrationResponse> documents = new ArrayList<>();
        registration.getDocuments().forEach(d -> {
            DocumentRegistrationResponse doc = new DocumentRegistrationResponse();
            doc.setId(d.getId());
            doc.setDescription(d.getDescription());
            doc.setName(d.getName());
            documents.add(doc);
        });
        details.setDocumentRegistrationResponseList(documents);

        return details;

    }
}
