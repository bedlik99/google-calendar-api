package com.example.googlecalendarapi.google;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "google.api")
public class GoogleApiProperties {

    private String serviceAccountName;
    private String calendarId;
    private String calendarName;

    public String getServiceAccountName() {
        return serviceAccountName;
    }

    public String getCalendarId() {
        return calendarId;
    }

    public void setServiceAccountName(String serviceAccountName) {
        this.serviceAccountName = serviceAccountName;
    }

    public void setCalendarId(String calendarId) {
        this.calendarId = calendarId;
    }

    public String getCalendarName() {
        return calendarName;
    }

    public void setCalendarName(String calendarName) {
        this.calendarName = calendarName;
    }
}
