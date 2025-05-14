package com.centre.poly.user.service.impl;

import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.InvalidActionException;
import com.centre.poly.exception.NotFoundException;
import com.centre.poly.user.dto.AdminChangePasswordRequest;
import com.centre.poly.user.dto.UserFilterRequest;
import com.centre.poly.user.dto.UserResponse;
import com.centre.poly.user.entity.User;
import com.centre.poly.user.mapper.UserMapper;
import com.centre.poly.user.repository.UserRepository;
import com.centre.poly.user.service.UserServiceImpl;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserServiceImpl {

  private final UserRepository userRepository;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;

  @Override
  public PageResponse<UserResponse> findAll(int page, int size, UserFilterRequest filter) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
    UserFilterRequest userFilterRequest = filter;
    Page<User> users =
        userRepository.findByFilters(
            filter.getUserName(), filter.getFirstName(), filter.getLastName(), pageable);
    List<UserResponse> userResponses = users.stream().map(userMapper::toResponse).toList();
    return new PageResponse<>(
        userResponses,
        users.getNumber(),
        users.getSize(),
        users.getTotalElements(),
        users.getTotalPages(),
        users.isFirst(),
        users.isLast());
  }

  public void changePasswordAtFirstLogin(Integer userConnectedId, String newPassword) {
    User user = getUserById(userConnectedId);
    user.setPassword(passwordEncoder.encode(newPassword));
    user.setMustChangePassword(false);
    userRepository.save(user);
  }

  public User getUserById(Integer userId) {
    return userRepository
        .findById(userId)
        .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));
  }

  public boolean isMustChangePasswordFirstLogin(Integer userConnectedId) {
    User user =
        userRepository
            .findById(userConnectedId)
            .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));

    return user.isMustChangePassword();
  }

  public void adminChangeUserPassword(AdminChangePasswordRequest request) {
    User user = getUserById(request.idUser());

    if (!request.newPassword().equals(request.confirmPassword())) {
      throw new InvalidActionException("PASSWORDS_DO_NOT_MATCH");
    }

    user.setPassword(passwordEncoder.encode(request.newPassword()));

    if (request.resetPasswordChange()) {
      user.setMustChangePassword(true);
    }

    userRepository.save(user);
  }
}
