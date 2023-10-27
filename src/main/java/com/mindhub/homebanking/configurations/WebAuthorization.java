package com.mindhub.homebanking.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.WebAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@EnableWebSecurity
// Enables personalized security configurations for this class
@Configuration
// Configures the Spring Security module before running the app
public class WebAuthorization {

    // We want to add something to Spring's context and run it first
    @Bean
    // HttpSecurity allows configuring web based security for specific http requests.
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // We assign who has access to which endpoint
        http.authorizeRequests()

                .antMatchers(HttpMethod.POST, "/api/clients", "/api/login", "/api/logout").permitAll()
                .antMatchers("/web/index.html", "/web/css/**", "/web/js/**", "/assets/**", "/api/loans").permitAll()

                .antMatchers(HttpMethod.POST, "/api/loans/create").hasAuthority("ADMIN")
                .antMatchers("/rest/**", "/h2-console/**", "/web/pages/admin/**").hasAuthority("ADMIN")

                .antMatchers(HttpMethod.POST, "/api/loans", "/api/transactions").hasAuthority("CLIENT")
                .antMatchers(HttpMethod.PATCH, "/api/clients/current/cards/{id}", "/api/clients/current/accounts/{id}", "/api/loans/{id}").hasAuthority("CLIENT")
                .antMatchers("/web/pages/**", "/api/clients/current", "/api/clients/current/**", "/api/accounts/{id}", "/api/transactions").hasAuthority("CLIENT")

                .anyRequest().denyAll();

        // Endpoint for login and username and password parameters
        http.formLogin()

                .usernameParameter("email")

                .passwordParameter("password")

                .loginPage("/api/login");

        // Servlet
        http.logout().logoutUrl("/api/logout");

        // turn off checking for CSRF(Cross-Site Request Forgery) tokens
        // The server puts a token to each form it sends from the server to the user. It has to match the token from the user.
        http.csrf().disable();

        // disabling frameOptions so h2-console can be accessed
        // By default sensitive data is covered, so it can't be used by third-parties
        http.headers().frameOptions().disable();

        // if user is not authenticated, just send an authentication failure response in case an unidentified/unauthorized user tries to access a page.
        // Exception handler. req, what we send to the server. res, what we will return to the user. exc, error.
        http.exceptionHandling().authenticationEntryPoint((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

        // if login is successful, just clear the flags asking for authentication
        // We avoid asking the user to authenticate themselves every time they change pages
        http.formLogin().successHandler((req, res, auth) -> clearAuthenticationAttributes(req));

        // if login fails, just send an authentication failure response
        http.formLogin().failureHandler((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

        // if logout is successful, just send a success response
        http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());

        return http.build();
    }

    private void clearAuthenticationAttributes(HttpServletRequest request) {

        HttpSession session = request.getSession(false);

        // Cleans exceptions whenever authentication fails
        if (session != null) {
            session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
        }

    }
}
