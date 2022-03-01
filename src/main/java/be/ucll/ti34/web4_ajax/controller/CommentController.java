package be.ucll.ti34.web4_ajax.controller;

import be.ucll.ti34.web4_ajax.model.Comment;
import be.ucll.ti34.web4_ajax.repository.CommentRepository;
import be.ucll.ti34.web4_ajax.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/posts/{postId}/comments")
    public List<Comment> getAllCommentsByPostId(@PathVariable("postId") Long postId) {
        return postRepository.findCommentsByPostId(postId);
    }

    @PostMapping("/posts/{postId}/comments")
    public Optional<Comment> createComment(@PathVariable(value = "postId") Long postId, @Valid @RequestBody Comment comment) {
        return postRepository.findById(postId).map(post -> {
            Comment c = this.commentRepository.save(comment);
            post.getComments().add(c);
            postRepository.save(post);
            return c;
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
