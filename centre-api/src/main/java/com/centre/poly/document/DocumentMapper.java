package com.centre.poly.document;

import org.springframework.stereotype.Service;

@Service
public class DocumentMapper {
    
    public Document toDocument(DocumentRequest request) {
        return Document.builder()
                       .name(request.name())
                       .description(request.description())
                       .build();
    }
    
    public DocumentResponse toResponse(Document document) {
        return DocumentResponse.builder()
                               .id(document.getId())
                               .name(document.getName())
                               .description(document.getDescription())
                               .build();
    }
}
