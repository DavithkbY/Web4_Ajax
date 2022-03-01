package be.ucll.ti34.web4_ajax.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping("/search")
    public String searchPage(){

        return "search";
    }
}