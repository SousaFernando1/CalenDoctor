package br.com.calendoctor.entities.scheduling.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingPaymentWithSchedulingDTO {

    private Long id;
    private Double priceValue;
    private boolean paid;
    private LocalDateTime paymentDate;
    private SchedulingWithoutPaymentDTO scheduling;
}
