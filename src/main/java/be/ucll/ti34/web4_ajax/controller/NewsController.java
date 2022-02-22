package be.ucll.ti34.web4_ajax.controller;


import be.ucll.ti34.web4_ajax.model.News;
import be.ucll.ti34.web4_ajax.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.util.List;


@Controller
public class NewsController {
    @Autowired
    private NewsRepository repository;


    // Views
    @GetMapping("/news-overview")
    public String overview (Model model){
        return "news-overview";
    }

    @GetMapping("/add-news")
    public String addNews (Model model){
        return "add-news";
    }


    // API
    @GetMapping("/news")
    @ResponseBody
    public List<News> all(){
        return repository.findAll();
    }

    @PostMapping("/news")
    @ResponseBody
    public ResponseEntity<News> add(@Valid @RequestBody News news){
        repository.save(news);
        return new ResponseEntity<>(news, HttpStatus.CREATED);
    }

}
