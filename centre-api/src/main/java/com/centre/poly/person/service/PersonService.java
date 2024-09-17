package com.centre.poly.person.service;

import com.centre.poly.document.DocumentsRepository;
import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.exception.NotFoundException;
import com.centre.poly.person.Repository.PersonRepository;
import com.centre.poly.person.dto.*;
import com.centre.poly.person.entity.Address;
import com.centre.poly.person.entity.Parent;
import com.centre.poly.person.entity.Student;
import com.centre.poly.role.RoleRepository;
import com.centre.poly.user.User;
import com.centre.poly.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonService {


    private final ParentMapper parentMapper;
    private final PersonRepository personRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final StudentMapper studentMapper;
    private final DocumentsRepository documentsRepository;

   /* @Transactional
    public Integer save(RegistrationRequest request) {

        // Adress
        Address address = Address.builder().city(request.addressRequest().city()).street(request.addressRequest().street()).zipCode(request.addressRequest().zipCode()).build();

        // parent
        if (request.parentRequest().id() == null) {
            if (personRepository.existsByPhoneNumber(request.parentRequest().phoneNumber())) {
                throw new DuplicateEntityException("Phone number already exists");
            }
        }
        Parent parent = parentMapper.toParent(request.parentRequest());
        parent.setAddress(address);
        Parent parenSaved = personRepository.save(parent);

        User userParent = new User();
        userParent.setUserName(parenSaved.getPhoneNumber());
        userParent.setPassword(passwordEncoder.encode(parenSaved.getPhoneNumber()));
        userParent.setRoles(List.of(roleRepository.findByName("ROLE_PARENT").get()));
        userParent.setEnabled(true);
        userParent.setPerson(parenSaved);
        userRepository.save(userParent);


        //Student
        if (personRepository.existsByPhoneNumber(request.studentRequest().phoneNumber())) {
            throw new DuplicateEntityException("Phone number already exists");
        }
        Student student = studentMapper.toStudent(request.studentRequest());
        student.setAddress(address);
        student.setParent(parenSaved);
        Student studentSaved = personRepository.save(student);

        User userStudent = new User();
        userStudent.setUserName(studentSaved.getPhoneNumber());
        userStudent.setPassword(passwordEncoder.encode(studentSaved.getPhoneNumber()));
        userStudent.setRoles(List.of(roleRepository.findByName("ROLE_STUDENT").get()));
        userStudent.setEnabled(true);
        userStudent.setPerson(studentSaved);
        userRepository.save(userStudent);

        //Document registration
        request.documentIDs().forEach(id -> {
            Document doc = documentsRepository.findById(id).orElseThrow(() -> new NotFoundException("Document_not_found"));
        });
        request.documentIDs().forEach(id -> {
            Registration registration = new Registration();
            registration.setStudent(studentSaved);
            registration.setRegistrationDate(LocalDateTime.now());

            //registration.setDocuments(Document.builder().id(id).build());
        });
        return 1;
    }*/

    public ParentResponse findParentByNum(String num) {
        Parent parent = personRepository.findByPhoneNumber(num);
        if(parent != null){
            return ParentResponse.builder()
                    .id(parent.getId())
                    .firstName(parent.getFirstName())
                    .lastName(parent.getLastName())
                    .email(parent.getEmail())
                    .phoneNumber(parent.getPhoneNumber())
                    .profession(parent.getProfession())
                    .build();
        }else{
            throw new NotFoundException("Parent_not_found");
        }

    }

    public Parent saveParent(Parent parent, Address address) {
        Parent parentSaved = personRepository.findByPhoneNumber(parent.getPhoneNumber());
        if(parentSaved == null){
            if (isPhoneNumberUnique(parent.getPhoneNumber())) {
                throw new DuplicateEntityException("Phone number "+parent.getPhoneNumber()+" already exists");
            }

            if(!parent.getEmail().isEmpty() && isEmailUnique(parent.getEmail())) {
                throw new DuplicateEntityException("Email "+parent.getEmail()+" already exists");
            }

            parent.setAddress(address);
            parent.setProfession(parent.getProfession());
            parent = personRepository.save(parent);

            createUserParent(parent);

            return parent;
        }
        return parent;
    }

    public void createUserParent(Parent parent){
        User userStudent = new User();
        userStudent.setUserName(parent.getPhoneNumber());
        userStudent.setPassword(passwordEncoder.encode(parent.getPhoneNumber()));
        userStudent.setRoles(List.of(roleRepository.findByName("ROLE_PARENT").get()));
        userStudent.setEnabled(true);
        userStudent.setPerson(parent);
        userRepository.save(userStudent);
    }

    public Student saveStudent(Student student, Parent parent, Address address) {
        if (isPhoneNumberUnique(student.getPhoneNumber())) {
            throw new DuplicateEntityException("Phone number "+student.getPhoneNumber()+" already exists");
        }

        if(!student.getEmail().isEmpty() && isEmailUnique(student.getEmail())) {
            throw new DuplicateEntityException("Email "+student.getEmail()+" already exists");
        }

        student.setAddress(address);
        student.setParent(parent);
        student = personRepository.save(student);

        createUserStudent(student);

        return student;
    }

    public void createUserStudent(Student student){
        User userStudent = new User();
        userStudent.setUserName(student.getPhoneNumber());
        userStudent.setPassword(passwordEncoder.encode(student.getPhoneNumber()));
        userStudent.setRoles(List.of(roleRepository.findByName("ROLE_STUDENT").get()));
        userStudent.setEnabled(true);
        userStudent.setPerson(student);
        userRepository.save(userStudent);
    }

    public Boolean isPhoneNumberUnique(String phoneNumber) {
        return personRepository.existsByPhoneNumber(phoneNumber);
    }

    public Boolean isEmailUnique(String email) {
        return personRepository.existByEmail(email);
    }

}
