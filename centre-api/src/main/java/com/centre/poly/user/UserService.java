package com.centre.poly.user;

import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.NotFoundException;
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
public class UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;

  public PageResponse<UserResponse> findAll(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
    Page<User> users = userRepository.findAll(pageable);
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
}
