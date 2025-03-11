package com.centre.poly.role;

import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

  private final RoleRepository roleRepository;
  private final RoleMapper roleMapper;

  public Integer save(RoleRequest request) {

    Optional<Role> role = roleRepository.findByName(request.name());
    if (role.isPresent()) {
      throw new DuplicateEntityException("ROLE_ALREADY_EXISTS");
    }
    Role roleSaved = roleMapper.toRole(request);
    return roleRepository.save(roleSaved).getId();
  }

  public PageResponse<RoleResponse> findAll(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
    Page<Role> roles = roleRepository.findAll(pageable);
    List<RoleResponse> roleResponses = roles.stream().map(roleMapper::toRoleResponse).toList();
    return new PageResponse<>(
        roleResponses,
        roles.getNumber(),
        roles.getSize(),
        roles.getTotalElements(),
        roles.getTotalPages(),
        roles.isFirst(),
        roles.isLast());
  }
}
