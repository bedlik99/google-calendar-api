package com.example.googlecalendarapi.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {

    @RequestMapping(method = {RequestMethod.GET}, path = {
            "/sign-in",
            "/signed-in/calendar-overview"
    })
    public String redirectToIndexPage() {
        return "forward:/index.html";
    }

}
