package br.com.calendoctor.entities.expense.DTOs;

import br.com.calendoctor.entities.expense.ExpenseType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ExpenseDTO {
    private Long id;
    private String description;
    private Double value;
    private boolean paid;
    private LocalDateTime paymentDate;
    private ExpenseTypeDTO type;
}
