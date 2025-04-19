package br.com.calendoctor.entities.scheduling.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SchedulingByPeriodDTO {

        private LocalDateTime startDate;
        private LocalDateTime endDate;
}
