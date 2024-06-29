package com.centre.poly.registration.service;

import com.centre.poly.registration.DocumentMapper;
import com.centre.poly.registration.DocumentRequest;
import com.centre.poly.registration.DocumentResponse;
import com.centre.poly.registration.model.Document;
import com.centre.poly.registration.repository.DocumentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {


    private final DocumentsRepository documentsRepository;
    private final DocumentMapper documentMapper;

    public Integer save(DocumentRequest documentRequest) {
        Document document = documentMapper.toDocument(documentRequest);
        return documentsRepository.save(document).getId();
    }

    public List<DocumentResponse> findAll() {
        return documentsRepository.findAll().stream()
                .map(DocumentMapper::toResponse)
                .collect(Collectors.toList());
    }
}
