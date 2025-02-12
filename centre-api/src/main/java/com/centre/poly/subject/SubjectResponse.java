package com.centre.poly.subject;

public record SubjectResponse(
        Long id,
        String name,
        String description,
        String pdfFilePath,
        String wordFilePath
) {
}

