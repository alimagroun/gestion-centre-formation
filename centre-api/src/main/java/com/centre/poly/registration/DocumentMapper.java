package com.centre.poly.registration;

import com.centre.poly.registration.model.Document;
import org.springframework.stereotype.Service;

@Service
public class DocumentMapper {

    public Document toDocument(DocumentRequest request) {
        return Document.builder()
                .name(request.name())
                .description(request.description())
                .build();
    }

    public static DocumentResponse toResponse(Document document) {
        return DocumentResponse.builder()
                .name(document.getName())
                .description(document.getDescription())
                .build();
    }
}
