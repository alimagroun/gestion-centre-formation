package com.centre.poly.person.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Person {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_sequence")
  @SequenceGenerator(name = "person_sequence", sequenceName = "person_sequence", allocationSize = 1)
  private Long id;

  private String firstName;
  private String lastName;
  private String phoneNumber;
  private String email;
  private Date birthDate;
  private String identityNumber;

  @Embedded private Address address;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdDate;

  @LastModifiedDate
  @Column(insertable = false)
  private LocalDateTime lastModifiedDate;
}
