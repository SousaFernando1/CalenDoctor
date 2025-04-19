package br.com.calendoctor.controllers.scheduling;


import br.com.calendoctor.entities.expense.DTOs.ExpenseDTO;
import br.com.calendoctor.entities.scheduling.DTOs.*;
import br.com.calendoctor.entities.scheduling.Scheduling;
import br.com.calendoctor.services.scheduling.SchedulingService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/scheduling")
public class SchedulingController {

    @Autowired
    SchedulingService schedulingService;

    @PutMapping
    public ResponseEntity update(@RequestBody Scheduling scheduling) {
        return ResponseEntity.ok(schedulingService.save(scheduling));
    }

    @PostMapping("/range")
    public ResponseEntity<?> getEvents(@RequestBody SchedulingByPeriodDTO schedulingByPeriodDTO) {
        List<SchedulingDTO> events = schedulingService.findByPeriod(
                schedulingByPeriodDTO.getStartDate(),
                schedulingByPeriodDTO.getEndDate()
        );
        return ResponseEntity.ok(events);
    }

    @PostMapping("/by-user")
    public ResponseEntity<?> getEventsByUser(@RequestBody SchedulingByUserDTO schedulingByUserDTO) {
        List<SchedulingDTO> events = schedulingService.findByUser(
                schedulingByUserDTO.getId(),
                schedulingByUserDTO.getUserType()
        );
        return ResponseEntity.ok(events);
    }

    @GetMapping("/type")
    public ResponseEntity<?> getTypes(){

        return ResponseEntity.ok(schedulingService.getTypes());
    }

    @PostMapping("/type")
    public ResponseEntity<SchedulingTypeDTO> createType(@RequestBody SchedulingTypeDTO schedulingTypeDTO){

        return ResponseEntity.ok(schedulingService.createType(schedulingTypeDTO));
    }

    @GetMapping("/payment")
    public ResponseEntity<Page<SchedulingPaymentWithSchedulingDTO>>findByPeriod(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(schedulingService.findByPeriodPaged(startDate, endDate, page, size));
    }
}
