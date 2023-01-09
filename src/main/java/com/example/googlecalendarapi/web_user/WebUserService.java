package com.example.googlecalendarapi.web_user;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WebUserService {

    private final WebUserRepository webUserRepository;

    public WebUserService(WebUserRepository webUserRepository) {
        this.webUserRepository = webUserRepository;
    }

    public Optional<WebUser> getWebUser(String username) {
        return webUserRepository.findByUsername(username);
    }


}
