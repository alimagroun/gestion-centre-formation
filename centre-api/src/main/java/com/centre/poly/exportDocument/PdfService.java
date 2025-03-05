package com.centre.poly.exportDocument;

import com.centre.poly.classmanagement.entity.AcceleratedClass;
import com.centre.poly.classmanagement.entity.AcceleratedClassEntry;
import com.centre.poly.classmanagement.entity.AccreditedClass;
import com.centre.poly.classmanagement.entity.AccreditedClassEntry;
import com.centre.poly.classmanagement.repository.AcceleratedClassRepository;
import com.centre.poly.classmanagement.repository.AccreditedClassRepository;
import com.centre.poly.exception.NotFoundException;
import com.centre.poly.person.entity.Student;
import com.lowagie.text.DocumentException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

@Service
@RequiredArgsConstructor
public class PdfService {

  private final TemplateEngine templateEngine;
  private final AccreditedClassRepository accreditedClassRepository;
  private final AcceleratedClassRepository acceleratedClassRepository;

  public byte[] generateClassStudentPdf(Long classId, Boolean isAccredited, Boolean isAccelerated)
      throws IOException, DocumentException {

    List<Student> students;
    String className;

    if (isAccelerated) {
      AcceleratedClass acceleratedClass =
          acceleratedClassRepository
              .findById(classId)
              .orElseThrow(() -> new NotFoundException("Accelerated Class not found"));

      students =
          acceleratedClass.getAcceleratedClassEntries().stream()
              .map(AcceleratedClassEntry::getStudent)
              .toList();

      className =
          acceleratedClass.getSpecialty().getFormationType().getName()
              + "-"
              + acceleratedClass.getSpecialty().getDomaine().getName();
    } else {
      AccreditedClass accreditedClass =
          accreditedClassRepository
              .findById(classId)
              .orElseThrow(() -> new NotFoundException("Accredited Class not found"));

      students =
          accreditedClass.getAccreditedClassEntries().stream()
              .map(AccreditedClassEntry::getStudent)
              .toList();

      className =
          accreditedClass.getSpecialty().getFormationType().getName()
              + "-"
              + accreditedClass.getSpecialty().getDomaine().getName()
              + "-G"
              + accreditedClass.getGroupNumber()
              + "-"
              + accreditedClass.getSchoolYear().getStartYear()
              + "-"
              + accreditedClass.getSchoolYear().getEndYear();
    }

    Context context = new Context();
    context.setVariable("students", students);
    context.setVariable("className", className);

    String htmlContent = templateEngine.process("student-list", context);

    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    ITextRenderer renderer = new ITextRenderer();
    renderer.setDocumentFromString(htmlContent);
    renderer.layout();
    renderer.createPDF(outputStream);

    outputStream.close();
    return outputStream.toByteArray();
  }
}
