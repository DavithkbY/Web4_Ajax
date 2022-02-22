package be.ucll.ti34.web4_ajax.controller;


import be.ucll.ti34.web4_ajax.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class NewsController {
    @Autowired
    private NewsRepository newsRepository;

    @GetMapping("/news-overview")
    public String overview (Model model){
        return "/news-overview";
    }

}
