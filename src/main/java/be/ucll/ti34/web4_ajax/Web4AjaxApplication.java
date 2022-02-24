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

            postRepo.save(post1);
            postRepo.save(post2);

            Comment comment1 = new Comment("Wat leuk!");
            comment1.setPost(post1);
            comRepo.save(comment1);
            Comment comment2 = new Comment("Wat leuk!");
            comment2.setPost(post2);
            comRepo.save(comment2);
            Comment comment3 = new Comment("Tof!");
            comment3.setPost(post2);
            comRepo.save(comment3);
        };
    }

}
