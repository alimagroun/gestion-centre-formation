package com.centre.poly.schoolYear;

import com.centre.poly.common.PageResponse;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.InvalidRequestException;
import com.centre.poly.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SchoolYearService {


    private final SchoolYearMapper schoolYearMapper;
    private final SchoolYearRepository schoolYearRepository;


    public Long save(SchoolYearRequest request){
        if(request.endYear() < request.startYear()){
            throw new InvalidRequestException("End year must be greater than or equal to start year");
        }
        SchoolYear verify = schoolYearRepository.findByStarEndYear(request.startYear(), request.endYear());
        if(verify != null){
            throw new DuplicateEntityException("School year already exists");
        }
        SchoolYear schoolYear = schoolYearMapper.toRequest(request);
        schoolYear.setIsDefault(false);
        return schoolYearRepository.save(schoolYear).getId();

    }

    public PageResponse<SchoolYearResponse> findAllPagebale(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<SchoolYear> pageSchoolYear = schoolYearRepository.findAll(pageable);
        List<SchoolYearResponse> schoolYearResponses = pageSchoolYear.map(schoolYearMapper::toResponse).toList();
        return new PageResponse<>(schoolYearResponses, pageSchoolYear.getNumber(), pageSchoolYear.getSize(), pageSchoolYear.getTotalElements(), pageSchoolYear.getTotalPages(), pageSchoolYear.isFirst(), pageSchoolYear.isLast());
    }

    public SchoolYearResponse findById(Long id){
        SchoolYear schoolYear = schoolYearRepository.findById(id).orElseThrow(()-> new NotFoundException("School year not found"));
        return schoolYearMapper.toResponse(schoolYear);
    }

    //Only one school year can have isDefault = true. Before setting a new school year as the default, the previous default year must be set to false
    public void toDefault(Long id){

        SchoolYear schoolYearToDefault = schoolYearRepository.findById(id).orElseThrow(()-> new NotFoundException("School year not found"));

        SchoolYear schoolYears = schoolYearRepository.findAllDefaultTrue();
        if( schoolYears != null){
            schoolYears.setIsDefault(false);
            schoolYearRepository.save(schoolYears);

        }
        schoolYearToDefault.setIsDefault(true);
        schoolYearRepository.save(schoolYearToDefault);
    }

    public List<SchoolYearResponse> findAll(){
        return schoolYearRepository.findAll().stream().map(schoolYearMapper::toResponse).toList();
    }
}
