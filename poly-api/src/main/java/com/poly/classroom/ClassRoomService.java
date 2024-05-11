package com.poly.classroom;

import com.poly.exception.DuplicateEntityException;
import com.poly.exception.ErrorCodes;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClassRoomService {

    private final  ClassRoomRepository classRoomRepository;
    private final  ClassRoomMapper classRoomMapper;

    public Long save(ClassRoomRequest classRoomRequest, Authentication connectedUser) {
        if(!classRoomRepository.getClassRoomByName(classRoomRequest.getClass().getName()).isPresent()) {
            throw new DuplicateEntityException(ErrorCodes.CLASS_ROOM_EXISTS.toString());
        }
        ClassRoom classRoom = classRoomMapper.toClassRoom(classRoomRequest);
        return classRoomRepository.save(classRoom).getId();
    }
}
