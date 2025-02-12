package com.centre.poly.classroom;

import com.centre.poly.common.ApiResponse;
import com.centre.poly.common.PageResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/classrooms")
public class ClassroomController {

  private final ClassroomService classroomService;

  @PostMapping
  public ResponseEntity<ApiResponse> saveClassroom(@RequestBody @Valid ClassroomRequest request) {
    Long id = classroomService.saveClassroom(request);
    return ResponseEntity.ok()
        .body(
            ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .success(true)
                .message("Classroom successfully created")
                .build());
  }

  @GetMapping
  public ResponseEntity<ApiResponse<List<ClassroomResponse>>> getAllClassrooms() {
    List<ClassroomResponse> classroomList = classroomService.getAllClassrooms();
    return ResponseEntity.ok(
        ApiResponse.<List<ClassroomResponse>>builder()
            .status(HttpStatus.OK.value())
            .message("Classrooms fetched successfully")
            .success(true)
            .data(classroomList)
            .build());
  }

  @GetMapping("/paginated")
  public ResponseEntity<PageResponse<ClassroomResponse>> getClassroomsPaginated(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

    PageResponse<ClassroomResponse> response =
        classroomService.getClassroomsWithPagination(page, size);

    return ResponseEntity.ok(response);
  }
}
