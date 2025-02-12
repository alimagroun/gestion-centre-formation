package com.centre.poly.registration.entity;

import com.centre.poly.document.Document;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class RegistrationDocumentEntry {
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "document_entry_sequence")
    @SequenceGenerator(name = "document_entry_sequence",
                       sequenceName = "document_entry_sequence",
                       allocationSize = 1)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "document_id",
                nullable = false)
    private Document document;
    
    @ManyToOne
    @JoinColumn(name = "registration_id",
                nullable = false)
    private Registration registration;
    
}
