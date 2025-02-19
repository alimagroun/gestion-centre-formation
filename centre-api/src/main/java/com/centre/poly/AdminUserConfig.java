package com.centre.poly;

import com.centre.poly.person.Repository.PersonRepository;
import com.centre.poly.person.entity.Address;
import com.centre.poly.person.entity.Employer;
import com.centre.poly.role.Role;
import com.centre.poly.role.RoleRepository;
import com.centre.poly.user.User;
import com.centre.poly.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class AdminUserConfig {

  @Autowired private PasswordEncoder passwordEncoder;

  @Autowired private UserRepository userRepository;

  @Autowired RoleRepository roleRepository;

  @Autowired PersonRepository personRepository;

  @Bean
  public CommandLineRunner createAdminUser() {
    return args -> {
      if (!roleRepository.findByName("ROLE_ADMIN").isPresent()) {
        roleRepository.save(Role.builder().name("ROLE_ADMIN").build());
      }

      if (!roleRepository.findByName("ROLE_PARENT").isPresent()) {
        roleRepository.save(Role.builder().name("ROLE_PARENT").build());
      }

      if (!roleRepository.findByName("ROLE_STUDENT").isPresent()) {
        roleRepository.save(Role.builder().name("ROLE_STUDENT").build());
      }

      if (!roleRepository.findByName("ROLE_TEACHER").isPresent()) {
        roleRepository.save(Role.builder().name("ROLE_TEACHER").build());
      }

      if (userRepository.findByUserName("admin").isEmpty()) {

        Employer employer = new Employer();
        employer.setFirstName("Ahmed");
        employer.setLastName("Tiba");
        employer.setJobTitle("Admin");

        Address address = new Address();
        address.setCity("Sahline");
        address.setStreet("rue hedi chaker");
        address.setZipCode("5012");
        employer.setAddress(address);

        personRepository.save(employer);

        User admin = new User();
        admin.setUserName("admin");
        admin.setPassword(passwordEncoder.encode("12345678"));
        admin.setRoles(List.of(roleRepository.findByName("ROLE_ADMIN").get()));
        admin.setEnabled(true);
        admin.setPerson(employer);
        userRepository.save(admin);
      }
    };
  }
}
