package com.centre.poly.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminChangePasswordRequest(
    @NotNull(message = "USER_ID_REQUIRED") Integer idUser,
    @NotBlank(message = "NEW_PASSWORD_REQUIRED") String newPassword,
    @NotBlank(message = "CONFIRM_PASSWORD_REQUIRED") String confirmPassword,
    boolean resetPasswordChange) {}
