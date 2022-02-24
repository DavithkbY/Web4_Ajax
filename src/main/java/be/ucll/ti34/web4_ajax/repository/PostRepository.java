package be.ucll.ti34.web4_ajax.repository;

import be.ucll.ti34.web4_ajax.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
