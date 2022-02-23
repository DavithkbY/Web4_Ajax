package be.ucll.ti34.web4_ajax.controller;


import be.ucll.ti34.web4_ajax.model.News;
import be.ucll.ti34.web4_ajax.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@Controller
public class NewsController {
    @Autowired
    private NewsRepository repository;

    // Views
    @GetMapping("/news-overview")
    public String overview (Model model){
        return "news-overview";
    }

    // API
    @GetMapping("/news")
    @ResponseBody
    public List<News> all(){
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @GetMapping("/news/{id}")
    @ResponseBody
    public Optional<News> getById(@PathVariable("id") long id){
        return repository.findById(id);
    }

    @PostMapping("/news")
    @ResponseBody
    public News add(@Valid @RequestBody News news){
        return repository.save(news);
    }


}
