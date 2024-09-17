package com.centre.poly.subject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.NotFoundException;

@Service
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;
    private final SubjectMapper subjectMapper;

    public SubjectServiceImpl(SubjectRepository subjectRepository, SubjectMapper subjectMapper) {
        this.subjectRepository = subjectRepository;
        this.subjectMapper = subjectMapper;
    }
    
    @Override
    public Subject saveSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    @Override
    public Optional<Subject> getSubjectById(Long id) {
        return subjectRepository.findById(id);
    }

    @Override
    public PageResponse<SubjectResponse> getAllSubjects(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Subject> subjects = subjectRepository.findAll(pageable);
        List<SubjectResponse> subjectResponses = subjects.stream()
                .map(subjectMapper::toSubjectResponse)
                .toList();
        return new PageResponse<>(subjectResponses, subjects.getNumber(), subjects.getSize(), subjects.getTotalElements(), subjects.getTotalPages(), subjects.isFirst(), subjects.isLast());
    }

    @Override
    public Subject updateSubject(Long id, Subject subject) {
        return subjectRepository.findById(id)
                .map(existingSubject -> {
                    existingSubject.setName(subject.getName());
                    existingSubject.setDescription(subject.getDescription());
                    existingSubject.setPdfFilePath(subject.getPdfFilePath());
                    existingSubject.setWordFilePath(subject.getWordFilePath());
                    return subjectRepository.save(existingSubject);
                })
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + id));
    }

    @Override
    public void deleteSubject(Long id) {
        if (!subjectRepository.existsById(id)) {
            throw new NotFoundException("Subject not found with id " + id);
        }
        subjectRepository.deleteById(id);
    }
}

