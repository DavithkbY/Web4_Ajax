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
            newsRepo.save(new News("Test", "Test", "Test"));
            newsRepo.save(new News("Test2", "Test2", "Test2"));
            newsRepo.save(new News("Test3", "Test3", "Test3"));
        };
    }

}
