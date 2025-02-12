package com.centre.poly.document;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "document_sequence")
    @SequenceGenerator(name = "document_sequence",
                       sequenceName = "document_sequence",
                       allocationSize = 1)
    private Long id;
    
    
    String name;
    
    String description;
    
    @CreatedDate
    @Column(nullable = false,
            updatable = false)
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;
    
}
