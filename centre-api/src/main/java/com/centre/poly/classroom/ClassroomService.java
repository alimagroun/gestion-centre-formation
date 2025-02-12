package com.centre.poly.classroom;

import java.util.List;

import com.centre.poly.common.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.centre.poly.exception.DuplicateEntityException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClassroomService {
    
    private final ClassroomRepository classroomRepository;
    private final ClassroomMapper classroomMapper;
    
    public Long saveClassroom(ClassroomRequest request) {
        
        if (classroomRepository.existsByName(request.name())) {
            throw new DuplicateEntityException("A classroom with this name already exists.");
        }
        return classroomRepository.save(classroomMapper.toClassroom(request))
                                  .getId();
    }
    
    public List<ClassroomResponse> getAllClassrooms() {
        return classroomRepository.findAll()
                                  .stream()
                                  .map(classroomMapper::toResponse)
                                  .toList();
    }
    
    public PageResponse<ClassroomResponse> getClassroomsWithPagination(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Classroom> classrooms = classroomRepository.findAll(pageRequest);
        List<ClassroomResponse> classroomResponseList = classrooms.stream()
                                                                  .map(classroomMapper::toResponse)
                                                                  .toList();
        return new PageResponse<>(classroomResponseList,
                                  classrooms.getNumber(),
                                  classrooms.getSize(),
                                  classrooms.getTotalElements(),
                                  classrooms.getTotalPages(),
                                  classrooms.isFirst(),
                                  classrooms.isLast());
        
    }
}
