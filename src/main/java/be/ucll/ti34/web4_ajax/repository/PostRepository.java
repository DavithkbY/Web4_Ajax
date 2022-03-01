package be.ucll.ti34.web4_ajax.repository;

import be.ucll.ti34.web4_ajax.model.Comment;
import be.ucll.ti34.web4_ajax.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select p.comments from Post p where p.id = :post")
    List<Comment> findCommentsByPostId(@Param("post") Long postId);
}
