package com.example.googlecalendarapi.Repository;

import com.example.googlecalendarapi.Model.WebUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WebUserRepository extends JpaRepository<WebUser, String> {
    Optional<WebUser> findByUsername(String username);
}
