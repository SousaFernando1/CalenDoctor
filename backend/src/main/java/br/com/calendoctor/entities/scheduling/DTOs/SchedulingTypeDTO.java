package br.com.calendoctor.entities.scheduling.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingTypeDTO {

    private Long id;
    private String description;
    private Double defaultPrice;
    private Long defaultDuration;
}
