package br.com.calendoctor.repositories.expense;

import br.com.calendoctor.entities.expense.ExpenseType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseTypeRepository extends JpaRepository<ExpenseType, Long> {
}
