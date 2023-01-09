package com.example.googlecalendarapi.web_user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WebUserRepository extends JpaRepository<WebUser, String> {
    Optional<WebUser> findByUsername(String username);
}
