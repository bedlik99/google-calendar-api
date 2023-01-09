package com.example.googlecalendarapi.web_user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class WebUserController {

    private final WebUserService webUserService;

    public WebUserController(WebUserService webUserService) {
        this.webUserService = webUserService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<WebUser> getWebUser(@PathVariable String username) {
        return ResponseEntity.of(webUserService.getWebUser(username));
    }

}
