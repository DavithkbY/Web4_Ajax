package be.ucll.ti34.web4_ajax.controller;

import be.ucll.ti34.web4_ajax.model.Post;
import be.ucll.ti34.web4_ajax.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
public class PostController {
    @Autowired
    private PostRepository repository;

    @GetMapping("/posts")
    public List<Post> all() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @GetMapping("/posts/{id}")
    public Optional<Post> getById(@PathVariable("id") long id) {
        return repository.findById(id);
    }

    @PostMapping("/posts")
    public Post add(@Valid @RequestBody Post post) {
        return repository.save(post);
    }

    @PutMapping("/posts/{postId}")
    public Optional<Post> updatePost(@PathVariable Long postId, @Valid @RequestBody Post postRequest) {
        return repository.findById(postId).map(post -> {
            post.setTitle(postRequest.getTitle());
            post.setContent(postRequest.getContent());
            return repository.save(post);
        });
    }
}
