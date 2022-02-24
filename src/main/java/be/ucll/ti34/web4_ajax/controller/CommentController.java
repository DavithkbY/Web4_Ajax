package be.ucll.ti34.web4_ajax.controller;

import be.ucll.ti34.web4_ajax.model.Comment;
import be.ucll.ti34.web4_ajax.repository.CommentRepository;
import be.ucll.ti34.web4_ajax.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/posts/{postId}/comments")
    public Page<Comment> getAllCommentsByPostId(@PathVariable(value = "postId") Long postId, Pageable pageable) {
        return commentRepository.findByPostId(postId, pageable);
    }

    @PostMapping("/posts/{postId}/comments")
    public Optional<Comment> createComment(@PathVariable(value = "postId") Long postId, @Valid @RequestBody Comment comment) {
        return postRepository.findById(postId).map(post -> {
            comment.setPost(post);
            return commentRepository.save(comment);
        });
    }

    @PutMapping("/posts/{postId}/comments/{commentId}")
    public Optional<Comment> updateComment(@PathVariable(value = "postId") Long postId,
                                           @PathVariable(value = "commentId") Long commentId,
                                           @Valid @RequestBody Comment commentRequest) {
        return commentRepository.findById(commentId).map(comment -> {
            comment.setText(commentRequest.getText());
            return commentRepository.save(comment);
        });
    }
}
