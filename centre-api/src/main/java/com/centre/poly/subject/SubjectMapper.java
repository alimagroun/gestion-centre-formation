package com.centre.poly.subject;

import org.springframework.stereotype.Component;

@Component
public class SubjectMapper {
    
    public SubjectResponse toSubjectResponse(Subject subject) {
        return new SubjectResponse(
                subject.getId(),
                subject.getName(),
                subject.getDescription(),
                subject.getPdfFilePath(),
                subject.getWordFilePath()
        );
    }
}
