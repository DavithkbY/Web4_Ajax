package be.ucll.ti34.web4_ajax;

import be.ucll.ti34.web4_ajax.model.Comment;
import be.ucll.ti34.web4_ajax.model.Post;
import be.ucll.ti34.web4_ajax.repository.CommentRepository;
import be.ucll.ti34.web4_ajax.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Web4AjaxApplication {

    public static void main(String[] args) {
        SpringApplication.run(Web4AjaxApplication.class, args);
    }

    @Bean
    public CommandLineRunner data(PostRepository postRepo, CommentRepository comRepo) {
        return (args) -> {
            Post post1 = new Post("Miniemen blut", "Het miniemeninstituut is al zijn geld kwijt", "Rob");
            Post post2 = new Post("UCLL Rijk", "De UCLL heeft ineens heel veel geld gekregen van een donor", "Bob");

            Comment comment1 = new Comment("Davit","Wat stom!");
            Comment comment4 = new Comment("Davit","Wauw amazing leuk!");
            Comment comment5 = new Comment("Davit","Wat leuk!");
            Comment comment2 = new Comment("Ignace","Wat leuk man!");
            Comment comment3 = new Comment("Lander","Tof!");

            post1.getComments().add(comment1);
            post1.getComments().add(comment2);
            post2.getComments().add(comment3);
            post1.getComments().add(comment4);
            post1.getComments().add(comment5);


            postRepo.save(post1);
            postRepo.save(post2);


        };
    }

}
