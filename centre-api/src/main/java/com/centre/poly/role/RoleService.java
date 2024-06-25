package com.centre.poly.role;

import com.centre.poly.exception.DuplicateEntityException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public Integer save(RoleRequest request){

        Optional<Role> role = roleRepository.findByName(request.name());
        if(role.isPresent()){
            throw new DuplicateEntityException("ROLE_ALREADY_EXISTS");
        }
        Role roleSaved = roleMapper.toRole(request);
        return roleRepository.save(roleSaved).getId();

    }

    public List<RoleResponse> findAll(){
        return roleRepository.findAll().stream()
                .map(roleMapper::toRoleResponse)
                .collect(Collectors.toList());
    }
}
