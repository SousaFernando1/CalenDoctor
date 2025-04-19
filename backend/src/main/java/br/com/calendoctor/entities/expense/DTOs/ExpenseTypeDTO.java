package br.com.calendoctor.entities.expense.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExpenseTypeDTO {

    private Long id;
    private String description;
    private String frequency;
}
