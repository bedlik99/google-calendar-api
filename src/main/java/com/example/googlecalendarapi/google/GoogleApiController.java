package com.example.googlecalendarapi.google;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoogleApiController implements GoogleApiResources {

    private final GoogleApiService googleApiService;

    public GoogleApiController(GoogleApiService googleApiService) {
        this.googleApiService = googleApiService;
    }

    @Override
    public ResponseEntity<Object> createGoogleCredentials() {
        return ResponseEntity.of(googleApiService.createGoogleCredentialsWithServiceAccountDetails());
    }

}
