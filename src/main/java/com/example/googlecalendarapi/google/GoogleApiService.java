package com.example.googlecalendarapi.google;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class GoogleApiService {

    private final GoogleApiProperties googleApiProperties;

    public GoogleApiService(GoogleApiProperties googleApiProperties) {
        this.googleApiProperties = googleApiProperties;
    }

    public Optional<Object> createGoogleCredentialsWithServiceAccountDetails() {
        GoogleCredential credential;
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream(googleApiProperties.getServiceAccountName());
            if (inputStream == null) {
                return Optional.empty();
            }
            credential = GoogleCredential.fromStream(inputStream)
                    .createScoped(Collections.singletonList(CalendarScopes.CALENDAR_EVENTS));

            Calendar client = new Calendar.Builder(GoogleNetHttpTransport.newTrustedTransport(), new GsonFactory(), credential)
                    .setApplicationName(googleApiProperties.getCalendarName())
                    .build();

//            client.events().insert()

            List<Event> eventsList = Collections.singletonList(client
                    .events().list(googleApiProperties.getCalendarId()).execute())
                    .get(0)
                    .getItems();

            eventsList.forEach(el -> System.out.println(el.getSummary()));

        } catch (IOException e) {
            e.printStackTrace();
            return Optional.empty();
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }

        return Optional.empty();
    }


}
