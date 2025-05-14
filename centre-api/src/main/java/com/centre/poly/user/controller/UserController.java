package com.centre.poly.user;

import com.centre.poly.common.ApiResponse;
import com.centre.poly.common.PageResponse;
import com.centre.poly.common.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

  private final UserService userService;

  @GetMapping
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<PageResponse<UserResponse>> findAllUsers(
      @RequestParam(name = "page", defaultValue = "0", required = false) int page,
      @RequestParam(name = "size", defaultValue = "10", required = false) int size,
      @RequestBody UserFilterRequest filter) {
    return ResponseEntity.ok(userService.findAll(page, size, filter));
  }

  @PostMapping("/first-login/change-password")
  public ResponseEntity<ApiResponse> changePasswordFirstLogin(@RequestParam String newPassword) {
    Integer userConnectedId = SecurityUtil.getCurrentUserId();
    userService.changePasswordAtFirstLogin(userConnectedId, newPassword);
    return ResponseEntity.ok(
        ApiResponse.builder().status(200).success(true).message("CHANGE_PASSWORD_SUCCESS").build());
  }

  @GetMapping("/first-login/must-change-password")
  public ResponseEntity<ApiResponse> isMustChangePasswordFirstLogin() {
    Integer userConnectedId = SecurityUtil.getCurrentUserId();
    boolean isChange = userService.isMustChangePasswordFirstLogin(userConnectedId);
    return ResponseEntity.ok(
        ApiResponse.builder().status(200).success(true).data(isChange).build());
  }

  @PostMapping("/admin/change-password")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<ApiResponse> adminChangeUserPassword(
      @Valid @RequestBody AdminChangePasswordRequest request) {

    userService.adminChangeUserPassword(request);

    return ResponseEntity.ok(
        ApiResponse.builder()
            .status(200)
            .success(true)
            .message("ADMIN_CHANGE_PASSWORD_SUCCESS")
            .build());
  }
}
