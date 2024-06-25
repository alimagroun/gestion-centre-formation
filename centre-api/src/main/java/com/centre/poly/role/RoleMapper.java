package com.centre.poly.role;

import org.springframework.stereotype.Service;

@Service
public class RoleMapper {

    public Role toRole(RoleRequest request){
        Role role = new Role();
        role.setName(request.name());
        return role;
    }

    public RoleResponse toRoleResponse(Role role){
        return RoleResponse.builder()
                .name(role.getName())
                .build();
    }
}
