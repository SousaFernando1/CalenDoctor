package br.com.calendoctor.entities.scheduling.DTOs;

import br.com.calendoctor.entities.user.collaborator.DTOs.CollaboratorDTO;
import br.com.calendoctor.entities.user.patient.DTOs.PatientDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingWithoutPaymentDTO {

    private Long id;
    private String description;
    private SchedulingTypeDTO type;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private PatientDTO patient;
    private CollaboratorDTO collaborator;
    private LocalDateTime createdAt;
    private String recurrenceType;
    private Long recurrenceLength;

}
