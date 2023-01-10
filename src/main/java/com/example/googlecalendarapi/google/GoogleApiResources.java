package com.example.googlecalendarapi.google;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

public interface GoogleApiResources {

    @PostMapping("/create-gcredentials")
    ResponseEntity<Object> createGoogleCredentials();
}
