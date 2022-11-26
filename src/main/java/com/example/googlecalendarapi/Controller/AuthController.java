package com.example.googlecalendarapi.Controller;

import com.example.googlecalendarapi.JWT_util.JwtTokenUtil;
import com.example.googlecalendarapi.Model.WebUser;
import com.example.googlecalendarapi.DTO.AuthRequest;
import com.example.googlecalendarapi.DTO.AuthResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthController(AuthenticationManager authManager, JwtTokenUtil jwtTokenUtil) {
        this.authManager = authManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthRequest request) {
        try {
            Authentication authentication = authManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            WebUser user = (WebUser) authentication.getPrincipal();
            String accessToken = jwtTokenUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getUsername(), accessToken);
            return ResponseEntity.ok().body(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/auth/validate-token")
    public ResponseEntity<Object> validateToken(@RequestBody String jwtAccessToken) {
        var rawAccessToken = jwtAccessToken;
        if(isStringInQuotes(rawAccessToken)){
            rawAccessToken = jwtAccessToken.substring(1, jwtAccessToken.length() - 1);
        }
        rawAccessToken = rawAccessToken.split(" ")[1];
        var validatedOk = jwtTokenUtil.validateAccessToken(rawAccessToken);
        if (validatedOk) {
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    }



    private boolean isStringInQuotes(String inputString) {
        return (inputString.charAt(0) == '"' && inputString.charAt(inputString.length() - 1) == '"') ||
                (inputString.charAt(0) == '\'' && inputString.charAt(inputString.length() - 1) == '\'');
    }

}
