package com.example.googlecalendarapi.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

public interface AuthResources {

    @PostMapping("/auth/login")
    ResponseEntity<Object> login(@RequestBody @Valid AuthRequest request);

    @PostMapping("/auth/validate-token")
    ResponseEntity<Object> validateToken(@RequestBody String jwtAccessToken);

}
