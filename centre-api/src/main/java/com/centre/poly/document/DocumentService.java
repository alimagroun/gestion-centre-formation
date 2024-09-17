package com.centre.poly.document;

import com.centre.poly.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {


    private final DocumentsRepository documentsRepository;
    private final DocumentMapper documentMapper;

    public Long save(DocumentRequest documentRequest) {
        Document document = documentMapper.toDocument(documentRequest);
        return documentsRepository.save(document).getId();
    }

    public PageResponse<DocumentResponse> findAllPageable(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdDate");
        Page<Document> documents = documentsRepository.findAll(pageable);
        List<DocumentResponse> documentResponses = documents.stream().map(documentMapper::toResponse).toList();
        return new PageResponse<>(documentResponses, documents.getNumber(), documents.getSize(), documents.getTotalElements(), documents.getTotalPages(), documents.isFirst(), documents.isLast());
    }

    public List<DocumentResponse> findAll(){
        List<Document> documents = documentsRepository.findAll();
        List<DocumentResponse> documentResponses = documents.stream().map(documentMapper::toResponse).toList();
        return documentResponses;
    }
}
