package com.centre.poly.common;

import com.centre.poly.user.entity.User;
import com.centre.poly.user.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {

  private static UserServiceImpl userServiceImpl;

  @Autowired
  public void setUserService(UserServiceImpl userServiceImpl) {
    SecurityUtil.userServiceImpl = userServiceImpl;
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
    User user = userServiceImpl.getUserById(userId);
    return user.getPerson().getId();
  }
}
