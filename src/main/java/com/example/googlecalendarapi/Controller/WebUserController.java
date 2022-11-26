package com.example.googlecalendarapi.Controller;

import com.example.googlecalendarapi.Model.WebUser;
import com.example.googlecalendarapi.Service.WebUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class WebUserController {

    private final WebUserService webUserService;

    public WebUserController(WebUserService webUserService) {
        this.webUserService = webUserService;
    }

    @RequestMapping(method = {RequestMethod.GET}, path = {"/user/{username}"})
    public ResponseEntity<WebUser> getWebUser(@PathVariable String username) {
        return ResponseEntity.of(webUserService.getWebUser(username));
    }


}
