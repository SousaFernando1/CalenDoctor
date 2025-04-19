package br.com.calendoctor.repositories.expense;

import br.com.calendoctor.entities.expense.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    Page<Expense> findByPaymentDateBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

}
