package com.example.googlecalendarapi.Controller;

import com.example.googlecalendarapi.Service.GoogleApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoogleApiController {

    private GoogleApiService googleApiService;

    public GoogleApiController(GoogleApiService googleApiService) {
        this.googleApiService = googleApiService;
    }

    @PostMapping("/create-gcredentials")
    public ResponseEntity<Object> createGoogleCredentials(){
        return ResponseEntity.of(googleApiService.createGoogleCredentialsWithServiceAccountDetails());
    }

}
