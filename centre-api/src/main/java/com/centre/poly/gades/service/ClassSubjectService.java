package com.centre.poly.gades.service;

import com.centre.poly.classmanagement.entity.ClassGroup;
import com.centre.poly.classmanagement.repository.ClassRepository;
import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.NotFoundException;
import com.centre.poly.gades.dto.ClassSubjectRequest;
import com.centre.poly.gades.dto.ClassSubjectResponse;
import com.centre.poly.gades.entity.ClassSubject;
import com.centre.poly.gades.mapper.ClassSubjectMapper;
import com.centre.poly.gades.repository.ClassSubjectRepository;
import com.centre.poly.subject.Subject;
import com.centre.poly.subject.SubjectRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClassSubjectService {

  private final ClassSubjectRepository classSubjectRepository;
  private final SubjectRepository subjectRepository;
  private final ClassRepository classRepository;
  private final ClassSubjectMapper classSubjectMapper;

  public Long addClassSubject(ClassSubjectRequest request) {

    ClassGroup classGroupEntity =
        classRepository
            .findById(request.classId())
            .orElseThrow(() -> new NotFoundException("Class not found"));

    Subject subject =
        subjectRepository
            .findById(request.subjectId())
            .orElseThrow(() -> new NotFoundException("Subject not found"));

    boolean exists =
        classSubjectRepository.existsByClassGroupEntityAndSubjectAndSemester(
            classGroupEntity, subject, request.semestre());

    if (exists) {
      throw new DuplicateEntityException(
          "This subject is already assigned to the class for this semester.");
    }

    ClassSubject classSubject = classSubjectMapper.toEntity(request, classGroupEntity, subject);

    return classSubjectRepository.save(classSubject).getId();
  }

  public PageResponse<ClassSubjectResponse> findAll(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
    Page<ClassSubject> classSubjects = classSubjectRepository.findAll(pageable);
    List<ClassSubjectResponse> classSubjectResponses =
        classSubjects.stream().map(classSubjectMapper::toResponse).toList();
    return new PageResponse<>(
        classSubjectResponses,
        classSubjects.getNumber(),
        classSubjects.getSize(),
        classSubjects.getTotalElements(),
        classSubjects.getTotalPages(),
        classSubjects.isFirst(),
        classSubjects.isLast());
  }
}
