package com.centre.poly.subject;

import java.util.Optional;

import com.centre.poly.common.PageResponse;

public interface SubjectService {
    Subject saveSubject(Subject subject);
    Optional<Subject> getSubjectById(Long id);
    PageResponse<SubjectResponse> getAllSubjects(int page, int size);
    Subject updateSubject(Long id, Subject subject);
    void deleteSubject(Long id);
}

