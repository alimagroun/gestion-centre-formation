package com.centre.poly.user;

import com.centre.poly.role.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    
    private Integer id;
    private String userName;
    private boolean isEnabled;
    private LocalDateTime createdDate;
    private List<Role> roles;
    private PersonResponse person;
}
