package com.centre.poly.user;

import com.centre.poly.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public PageResponse<UserResponse> findAll(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<User> users = userRepository.findAll(pageable);
        List<UserResponse> userResponses = users.stream().map(userMapper::toResponse).toList();
        return new PageResponse<>(userResponses, users.getNumber(), users.getSize(), users.getTotalElements(), users.getTotalPages(), users.isFirst(), users.isLast());
    }
}
