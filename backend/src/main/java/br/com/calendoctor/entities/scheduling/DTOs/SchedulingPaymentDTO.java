package br.com.calendoctor.entities.scheduling.DTOs;

import br.com.calendoctor.entities.scheduling.Scheduling;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingPaymentDTO {

    private Long id;
    private Double priceValue;
    private boolean paid;
    private LocalDateTime paymentDate;
}
