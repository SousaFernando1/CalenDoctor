package br.com.calendoctor.entities.role;

import jakarta.persistence.*;
import lombok.*;

@Entity(name= "roles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="description")
    private String description;
}
