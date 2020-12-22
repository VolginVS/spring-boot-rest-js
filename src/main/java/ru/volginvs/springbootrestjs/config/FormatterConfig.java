package ru.volginvs.springbootrestjs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.Formatter;
import ru.volginvs.springbootrestjs.model.Role;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.ParseException;
import java.util.Locale;

@Configuration
public class FormatterConfig {

    @PersistenceContext
    private EntityManager entityManager;

    @Bean
    public Formatter<Role> roleFormatter() {
        return new Formatter<Role>() {

            @Override
            public Role parse(String stringWithId, Locale locale) throws ParseException {
                return entityManager.find(Role.class, Long.parseLong(stringWithId));
            }

            @Override
            public String print(Role role, Locale locale) {
                return role.getId().toString();
            }
        };
    }
}

