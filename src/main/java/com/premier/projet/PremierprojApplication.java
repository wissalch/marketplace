package com.premier.projet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@Configuration
@EnableAutoConfiguration

@EnableJpaRepositories(basePackages= "com.premier.projet.Repository")
@EntityScan(basePackages = "com.premier.projet.Model")
@ComponentScan(basePackages = {"com.premier.projet.Service"})
@ComponentScan(basePackages = {"com.premier.projet.Controller"})





public class PremierprojApplication {

	public static void main(String[] args) {
		SpringApplication.run(PremierprojApplication.class, args);
	}

}
