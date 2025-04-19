package br.com.calendoctor.services.expense;

import br.com.calendoctor.entities.expense.DTOs.ExpenseDTO;
import br.com.calendoctor.entities.expense.Expense;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

public interface ExpenseService {

    Page<ExpenseDTO> findByPeriodPaged(LocalDateTime startDate, LocalDateTime endDate, int page, int size);

    ExpenseDTO save(ExpenseDTO expenseDTO);
}
