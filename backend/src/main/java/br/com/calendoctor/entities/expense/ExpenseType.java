package br.com.calendoctor.entities.expense;

import jakarta.persistence.*;
import lombok.*;

@Entity(name= "expense_type")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpenseType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="description")
    private String description;


    @Column(name="frequency")
    private String frequency;
}
