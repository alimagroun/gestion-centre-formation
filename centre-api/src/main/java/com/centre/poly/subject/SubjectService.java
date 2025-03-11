package com.centre.poly.subject;

import com.centre.poly.classmanagement.entity.Specialty;
import com.centre.poly.classmanagement.repository.SpecialtyRepository;
import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.InvalidRequestException;
import com.centre.poly.exception.NotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class SubjectService {

  private final SubjectRepository subjectRepository;
  private final SubjectMapper subjectMapper;
  private final SpecialtyRepository specialtyRepository;

  public Long save(SubjectRequest request, MultipartFile file) throws IOException {

    Map<String, String> errors = SubjectRequest.validate(request);
    if (!errors.isEmpty()) {
      throw new InvalidRequestException(errors);
    }

    Specialty specialty =
        specialtyRepository
            .findById(request.specialtyId())
            .orElseThrow(() -> new NotFoundException("Specialty not found"));

    if (subjectRepository.existsByName(request.name())) {
      throw new DuplicateEntityException("subject_name_exists");
    }

    Subject subject = subjectMapper.toSubject(request);
    subject.setPdfFile(file.isEmpty() ? null : file.getBytes());

    return subjectRepository.save(subject).getId();
  }

  public PageResponse<SubjectResponse> getAllSubjects(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
    Page<Subject> subjectPage = subjectRepository.findAll(pageable);
    List<SubjectResponse> subjects =
        subjectPage.stream().map(subjectMapper::toSubjectResponse).toList();
    return new PageResponse<>(
        subjects,
        subjectPage.getNumber(),
        subjectPage.getSize(),
        subjectPage.getTotalElements(),
        subjectPage.getTotalPages(),
        subjectPage.isFirst(),
        subjectPage.isLast());
  }

  /*public Optional<Subject> getSubjectById(Long id) {
    return subjectRepository.findById(id);
  }

  public PageResponse<SubjectResponse> getAllSubjects(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
    Page<Subject> subjects = subjectRepository.findAll(pageable);
    List<SubjectResponse> subjectResponses =
        subjects.stream().map(subjectMapper::toSubjectResponse).toList();
    return new PageResponse<>(
        subjectResponses,
        subjects.getNumber(),
        subjects.getSize(),
        subjects.getTotalElements(),
        subjects.getTotalPages(),
        subjects.isFirst(),
        subjects.isLast());
  }

  public Subject updateSubject(Long id, Subject subject) {
    return subjectRepository
        .findById(id)
        .map(
            existingSubject -> {
              existingSubject.setName(subject.getName());
              existingSubject.setDescription(subject.getDescription());
              existingSubject.setPdfFilePath(subject.getPdfFilePath());
              return subjectRepository.save(existingSubject);
            })
        .orElseThrow(() -> new NotFoundException("Subject not found with id " + id));
  }

  public void deleteSubject(Long id) {
    if (!subjectRepository.existsById(id)) {
      throw new NotFoundException("Subject not found with id " + id);
    }
    subjectRepository.deleteById(id);
  }*/
}
