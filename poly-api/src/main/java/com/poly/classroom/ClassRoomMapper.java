package com.poly.classroom;

import org.springframework.stereotype.Service;

@Service
public class ClassRoomMapper {

    public ClassRoom toClassRoom(ClassRoomRequest request){

        ClassRoom classRoom = ClassRoom.builder()
                .name(request.name())
                .type(request.type())
                .build();

        return classRoom;
    }
}
