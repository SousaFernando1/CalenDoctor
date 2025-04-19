package br.com.calendoctor.services.expense;

import br.com.calendoctor.entities.expense.DTOs.ExpenseTypeDTO;
import br.com.calendoctor.entities.expense.ExpenseType;

import java.util.List;

public interface ExpenseTypeService {
    List<ExpenseTypeDTO> findAll();

    ExpenseType findById(Long id);


    ExpenseTypeDTO save(ExpenseTypeDTO expenseTypeDTO);

}
