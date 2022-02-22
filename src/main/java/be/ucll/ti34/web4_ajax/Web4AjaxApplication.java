package be.ucll.ti34.web4_ajax;

import be.ucll.ti34.web4_ajax.model.News;
import be.ucll.ti34.web4_ajax.repository.NewsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Web4AjaxApplication {

    public static void main(String[] args) {
        SpringApplication.run(Web4AjaxApplication.class, args);
    }

    @Bean
    public CommandLineRunner data(NewsRepository newsRepo) {
        return (args) -> {
            newsRepo.save(new News("Miniemen blut", "Het miniemeninstituut is al zijn geld kwijt", "Rob"));
            newsRepo.save(new News("UCLL Rijk", "De UCLL heeft ineens heel veel geld gekregen van een donor", "Bob"));
        };
    }

}
