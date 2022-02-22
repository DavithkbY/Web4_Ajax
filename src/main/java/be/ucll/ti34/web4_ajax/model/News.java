package be.ucll.ti34.web4_ajax.model;


import javax.persistence.*;
import javax.validation.constraints.*;
@Entity
@Table(
        name= "news"
)

public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank()
    private String title;

    @NotBlank()
    private String content;

    @NotBlank()
    private String author;
}
