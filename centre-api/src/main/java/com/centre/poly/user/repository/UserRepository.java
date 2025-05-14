package com.centre.poly.user;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByUserName(String userName);

  boolean existsByUserName(String userName);

  @Query(
"""
    SELECT u FROM User u
    WHERE (:userName IS NULL OR LOWER(u.userName) LIKE LOWER(CONCAT('%', :userName, '%')))
      AND (:firstName IS NULL OR LOWER(u.person.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')))
      AND (:lastName IS NULL OR LOWER(u.person.lastName) LIKE LOWER(CONCAT('%', :lastName, '%')))
""")
  Page<User> findByFilters(
      @Param("userName") String userName,
      @Param("firstName") String firstName,
      @Param("lastName") String lastName,
      Pageable pageable);
}
