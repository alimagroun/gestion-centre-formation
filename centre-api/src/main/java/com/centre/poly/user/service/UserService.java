package com.centre.poly.user.service;

import com.centre.poly.common.PageResponse;
import com.centre.poly.user.dto.AdminChangePasswordRequest;
import com.centre.poly.user.dto.UserFilterRequest;
import com.centre.poly.user.dto.UserResponse;
import com.centre.poly.user.entity.User;

public interface UserService {

  PageResponse<UserResponse> findAll(int page, int size, UserFilterRequest filter);

  void changePasswordAtFirstLogin(Integer userConnectedId, String newPassword);

  User getUserById(Integer userId);

  boolean isMustChangePasswordFirstLogin(Integer userConnectedId);

  void adminChangeUserPassword(AdminChangePasswordRequest request);
}
