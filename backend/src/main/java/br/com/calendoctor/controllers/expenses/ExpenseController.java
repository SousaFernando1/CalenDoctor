package br.com.calendoctor.controllers.expenses;

import br.com.calendoctor.entities.expense.DTOs.ExpenseDTO;
import br.com.calendoctor.entities.expense.DTOs.ExpenseTypeDTO;
import br.com.calendoctor.services.expense.ExpenseService;
import br.com.calendoctor.services.expense.ExpenseTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    ExpenseService expenseService;

    @Autowired
    ExpenseTypeService expenseTypeService;

    @GetMapping("/type")
    public ResponseEntity<List<ExpenseTypeDTO>> getTypes(){
        return ResponseEntity.ok(expenseTypeService.findAll());
    }

    @PostMapping("/type")
    public ResponseEntity<ExpenseTypeDTO> createType(@RequestBody ExpenseTypeDTO expenseTypeDTO) {
        return ResponseEntity.ok(expenseTypeService.save(expenseTypeDTO));
    }

    @PostMapping
    public ResponseEntity<ExpenseDTO> createExpense(@RequestBody ExpenseDTO expenseDTO) {
        return ResponseEntity.ok(expenseService.save(expenseDTO));
    }


    @GetMapping()
    public ResponseEntity<Page<ExpenseDTO>>findByPeriod(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(expenseService.findByPeriodPaged(startDate, endDate, page, size));
    }
}
