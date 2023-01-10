package com.example.googlecalendarapi.auth;

import com.example.googlecalendarapi.util.JWT.JwtTokenUtil;
import com.example.googlecalendarapi.web_user.WebUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController implements AuthResources {

    private final AuthenticationManager authManager;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthController(AuthenticationManager authManager, JwtTokenUtil jwtTokenUtil) {
        this.authManager = authManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public ResponseEntity<Object> login(AuthRequest request) {
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

    @Override
    public ResponseEntity<Object> validateToken(String jwtAccessToken) {
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
