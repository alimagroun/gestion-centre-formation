package com.centre.poly.common;

import com.centre.poly.user.User; // Assurez-vous d'importer la bonne classe User
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {

  public static Integer getCurrentUserId() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof User connectedUser) {
      return connectedUser.getId();
    }
    throw new IllegalStateException("Utilisateur non authentifié");
  }
}
