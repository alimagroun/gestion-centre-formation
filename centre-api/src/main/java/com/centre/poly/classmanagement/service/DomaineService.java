package com.centre.poly.classmanagement.service;

import com.centre.poly.classmanagement.dto.DomaineRequest;
import com.centre.poly.classmanagement.dto.DomaineResponse;
import com.centre.poly.classmanagement.entity.Domaine;
import com.centre.poly.classmanagement.mapper.DomaineMapper;
import com.centre.poly.classmanagement.repository.DomaineRepository;
import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.InvalidActionException;
import com.centre.poly.exception.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DomaineService {

  private final DomaineRepository domaineRepository;
  private final DomaineMapper domaineMapper;

  public Long save(DomaineRequest request) {

    Domaine exist = domaineRepository.findByName(request.name());
    if (exist != null) {
      throw new DuplicateEntityException("Domaine with name " + request.name() + " already exists");
    }
    return domaineRepository.save(domaineMapper.toRequest(request)).getId();
  }

  public PageResponse<DomaineResponse> findAllPageable(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
    Page<Domaine> domainePage = domaineRepository.findAll(pageable);
    List<DomaineResponse> list = domainePage.stream().map(domaineMapper::toResponse).toList();
    return new PageResponse<>(
        list,
        domainePage.getNumber(),
        domainePage.getSize(),
        domainePage.getTotalElements(),
        domainePage.getTotalPages(),
        domainePage.isFirst(),
        domainePage.isLast());
  }

  public List<DomaineResponse> findAll() {
    return domaineRepository.findAll().stream().map(domaineMapper::toResponse).toList();
  }

  public void deleteById(Long id) {
    if (!domaineRepository.existsById(id)) {
      throw new NotFoundException("Domaine_not_found");
    }

    boolean isUsed = domaineRepository.existsInClassByDomaineId(id);
    if (isUsed) {
      throw new InvalidActionException(
          "Cannot delete domaine because it is used by one or more classes");
    }
    domaineRepository.deleteById(id);
  }

  public Domaine findById(Long id) {
    return domaineRepository
        .findById(id)
        .orElseThrow(() -> new NotFoundException("Domaine with id " + id + " not found"));
  }

  public Long update(Long id, DomaineRequest request) {

    Domaine domaine = findById(id);

    Domaine domaineByName = domaineRepository.findByName(request.name());
    if (domaineByName != null && domaineByName.getId() != domaine.getId()) {
      throw new DuplicateEntityException("Domaine with name " + request.name() + " already exists");
    }

    domaine.setName(request.name());
    domaine.setDescription(request.description());

    return domaineRepository.save(domaine).getId();
  }
}
