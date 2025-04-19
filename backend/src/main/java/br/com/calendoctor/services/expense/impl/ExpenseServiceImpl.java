package br.com.calendoctor.services.expense.impl;

import br.com.calendoctor.entities.expense.DTOs.ExpenseDTO;
import br.com.calendoctor.entities.expense.DTOs.ExpenseTypeDTO;
import br.com.calendoctor.entities.expense.Expense;
import br.com.calendoctor.entities.expense.ExpenseType;
import br.com.calendoctor.repositories.expense.ExpenseRepository;
import br.com.calendoctor.services.expense.ExpenseService;
import br.com.calendoctor.services.expense.ExpenseTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service

public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ExpenseTypeService expenseTypeService;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public Page<ExpenseDTO> findByPeriodPaged(LocalDateTime startDate, LocalDateTime endDate, int page, int size) {

        Page<Expense> list = expenseRepository.findByPaymentDateBetween(
                startDate,
                endDate,
                PageRequest.of(page, size)
        );

        return list.map(e -> modelMapper.map(e, ExpenseDTO.class));

    }

    @Override
    public ExpenseDTO save(ExpenseDTO expenseDTO) {

        var type = expenseTypeService.findById(expenseDTO.getType().getId());

        Expense newExpense = Expense.builder()
                .id(expenseDTO.getId())
                .value(expenseDTO.getValue())
                .description(expenseDTO.getDescription())
                .paid(true)
                .type(type)
                .build();


        return modelMapper.map(expenseRepository.save(newExpense), ExpenseDTO.class);
    }
}
