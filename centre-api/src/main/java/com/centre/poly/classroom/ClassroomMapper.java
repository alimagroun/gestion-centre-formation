package com.centre.poly.classroom;

import org.springframework.stereotype.Service;

@Service
public class ClassroomMapper {
    
    public Classroom toClassroom(ClassroomRequest request) {
        Classroom classroom = new Classroom();
        classroom.setName(request.name());
        classroom.setType(request.type());
        return classroom;
    }
    
    public ClassroomResponse toResponse(Classroom classroom) {
        ClassroomResponse response = new ClassroomResponse();
        response.setId(classroom.getId());
        response.setName(classroom.getName());
        response.setType(classroom.getType());
        return response;
    }
}
