package com.centre.poly.common;

import com.centre.poly.user.User;
import com.centre.poly.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {

  private static UserService userService;

  @Autowired
  public void setUserService(UserService userService) {
    SecurityUtil.userService = userService;
  }

  public static Integer getCurrentUserId() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof User connectedUser) {
      return connectedUser.getId();
    }
    throw new IllegalStateException("Utilisateur non authentifié");
  }

  public static Long getCurrentPersonId() {
    Integer userId = getCurrentUserId();
    User user = userService.getUserById(userId);
    return user.getPerson().getId();
  }
}
