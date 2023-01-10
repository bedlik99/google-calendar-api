package com.example.googlecalendarapi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendViewController {

    private final String basePathRoute = "/";
    private final String signInFormRoute = "/view/sign-in";
    private final String calendarOverviewRoute = "/view/signed-in/calendar-overview";

    @GetMapping(path = {basePathRoute, signInFormRoute, calendarOverviewRoute})
    public String redirectToIndexPage() {
        return "forward:/frontend/index.html";
    }

}
