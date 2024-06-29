package com.centre.poly.person;

import com.centre.poly.exception.DuplicateEntityException;
import com.centre.poly.person.dto.AddressRequest;
import com.centre.poly.person.dto.ParentMapper;
import com.centre.poly.person.dto.RegistrationRequest;
import com.centre.poly.person.dto.StudentMapper;
import com.centre.poly.person.model.Address;
import com.centre.poly.person.model.Parent;
import com.centre.poly.person.model.Student;
import com.centre.poly.role.RoleRepository;
import com.centre.poly.user.User;
import com.centre.poly.user.UserRepository;
import jakarta.transaction.Transactional;
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

    @Transactional
    public Integer save(RegistrationRequest request) {

        // Adress
        Address address = Address.builder()
                .city(request.addressRequest().city())
                .street(request.addressRequest().street())
                .zipCode(request.addressRequest().zipCode())
                .build();

        // parent
        if (request.parentRequest().id() == null){
            if (personRepository.existsByPhoneNumber(request.parentRequest().phoneNumber())) {
                throw new DuplicateEntityException("Phone number already exists");
            }
            Parent parent = parentMapper.toParent(request.parentRequest());
            parent.setAddress(address);
            Parent parenSaved = personRepository.save(parent);

            User user = new User();
            user.setUserName(parenSaved.getPhoneNumber());
            user.setPassword(passwordEncoder.encode(parenSaved.getPhoneNumber()));
            user.setRoles(List.of(roleRepository.findByName("ROLE_PARENT").get()));
            user.setEnabled(true);
            user.setPerson(parenSaved);
            userRepository.save(user);
        }

        //Student
        if (personRepository.existsByPhoneNumber(request.studentRequest().phoneNumber())) {
            throw new DuplicateEntityException("Phone number already exists");
        }
        Student student = studentMapper.toStudent(request.studentRequest());
        student.setAddress(address);
        Student studentSaved = personRepository.save(student);

        User user = new User();
        user.setUserName(studentSaved.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(studentSaved.getPhoneNumber()));
        user.setRoles(List.of(roleRepository.findByName("ROLE_STUDENT").get()));
        user.setEnabled(true);
        user.setPerson(studentSaved);
        userRepository.save(user);

        return 1;
    }
}
