package com.centre.poly.documentation_registration.service;

import com.centre.poly.common.PageResponse;
import com.centre.poly.documentation_registration.DocumentMapper;
import com.centre.poly.documentation_registration.DocumentRequest;
import com.centre.poly.documentation_registration.DocumentResponse;
import com.centre.poly.documentation_registration.model.Document;
import com.centre.poly.documentation_registration.repository.DocumentsRepository;
import com.centre.poly.role.RoleMapper;
import com.centre.poly.role.RoleResponse;
import com.centre.poly.specialty.dto.DomainResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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

    public PageResponse<DocumentResponse> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdDate");
        Page<Document> documents = documentsRepository.findAll(pageable);
        List<DocumentResponse> documentResponses = documents.stream().map(documentMapper::toResponse).toList();
        return new PageResponse<>(documentResponses, documents.getNumber(), documents.getSize(), documents.getTotalElements(), documents.getTotalPages(), documents.isFirst(), documents.isLast());
    }
}
