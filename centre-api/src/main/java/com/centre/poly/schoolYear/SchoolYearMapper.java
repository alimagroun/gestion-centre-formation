package com.centre.poly.schoolYear;

import org.springframework.stereotype.Service;

@Service
public class SchoolYearMapper {
    
    public SchoolYearResponse toResponse(SchoolYear schoolYear) {
        SchoolYearResponse response = new SchoolYearResponse();
        response.setId(schoolYear.getId());
        response.setStart_year(schoolYear.getStartYear());
        response.setEnd_year(schoolYear.getEndYear());
        response.setIsDefault(schoolYear.getIsDefault());
        return response;
    }
    
    public SchoolYear toRequest(SchoolYearRequest request) {
        SchoolYear schoolYear = new SchoolYear();
        schoolYear.setStartYear(request.startYear());
        schoolYear.setEndYear(request.endYear());
        return schoolYear;
    }
}
