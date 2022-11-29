package com.example.googlecalendarapi.Security;

import com.example.googlecalendarapi.JWT_util.JwtTokenFilter;
import com.example.googlecalendarapi.Repository.WebUserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfiguration {

    private static final String[] FRONTEND_ROUTES = {"/sign-in", "/signed-in/calendar-overview"};
    private static final String[] HOSTED_STATIC_FILES_PATHS = {"/app.*", "/utils/**", "/pages/**", "/components/**", "/assets/**"};
    private final WebUserRepository webUserRepository;
    private final JwtTokenFilter jwtTokenFilter;

    public SecurityConfiguration(WebUserRepository webUserRepository, JwtTokenFilter jwtTokenFilter) {
        this.webUserRepository = webUserRepository;
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return webUserRepository
                        .findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not  found"));
            }
        };
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/h2-console/**");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.headers().addHeaderWriter((request, response) ->
                response.setHeader("Content-Security-Policy", "script-src 'self'"));
        http.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // start antMatchers just for test/dev
                .antMatchers("/user/*").permitAll()
                // finish antMatchers just for test/dev
                .antMatchers("/").permitAll()
                .antMatchers(FRONTEND_ROUTES).permitAll()
                .antMatchers(HOSTED_STATIC_FILES_PATHS).permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/auth/login").permitAll()
                .antMatchers("/auth/validate-token").permitAll()
                .anyRequest().authenticated();

        http.exceptionHandling().authenticationEntryPoint((request, response, ex) ->
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage()));


        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
