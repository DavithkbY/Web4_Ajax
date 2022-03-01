package be.ucll.ti34.web4_ajax.repository;

import be.ucll.ti34.web4_ajax.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> getCommentsByAuthorIgnoreCase(String author);
}
