package be.ucll.ti34.web4_ajax.repository;

import be.ucll.ti34.web4_ajax.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findAll();
}
