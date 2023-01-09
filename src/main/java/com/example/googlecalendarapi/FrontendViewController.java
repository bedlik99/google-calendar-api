package com.example.googlecalendarapi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendViewController {

    @GetMapping(path = {"/", "/view/sign-in", "/view/signed-in/calendar-overview"})
    public String redirectToIndexPage() {
        return "forward:/frontend/index.html";
    }

}
