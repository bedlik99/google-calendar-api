package com.example.googlecalendarapi.auth;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {

    @NotNull
    @Length(min = 4, max = 40)
    private String username;

    @NotNull
    @Length(min = 8, max = 40)
    private String password;

}
