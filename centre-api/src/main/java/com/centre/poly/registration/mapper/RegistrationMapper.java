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

        return RegistrationResponse.builder().id(registration.getId()).status(registration.getStatus()).createdDate(registration.getCreatedDate()).fullNameStudent(registration.getStudent().getFirstName() + ' ' + registration.getStudent().getLastName()).remarks(registration.getRemarks()).build();
    }

    public RegistrationDetailsResponse toRegistrationResponse(Registration registration) {

        RegistrationDetailsResponse details = new RegistrationDetailsResponse();
        details.setId(registration.getId());
        details.setStatus(registration.getStatus());
        details.setCreatedDate(registration.getCreatedDate());
        details.setRemarks(registration.getRemarks());

        details.setStudent(
                StudentDetails.builder()
                        .id(registration.getId())
                        .fullName(registration.getStudent().getFirstName() + ' ' + registration.getStudent().getLastName())
                        .levelOfEducation(registration.getStudent().getLevelOfEducation())
                        .phoneNumber(registration.getStudent().getPhoneNumber())
                        .email(registration.getStudent().getEmail())
                        .build()
        );

        details.setParent(
                ParentDetails.builder()
                        .id(registration.getStudent().getParent().getId())
                        .fullName(registration.getStudent().getParent().getFirstName() + ' ' + registration.getStudent().getParent().getLastName())
                        .profession(registration.getStudent().getParent().getProfession())
                        .phoneNumber(registration.getStudent().getParent().getPhoneNumber())
                        .email(registration.getStudent().getParent().getEmail())
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
