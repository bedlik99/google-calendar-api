package com.example.googlecalendarapi.Service;

import com.example.googlecalendarapi.Model.WebUser;
import com.example.googlecalendarapi.Repository.WebUserRepository;
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
