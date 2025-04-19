package br.com.calendoctor.entities.scheduling.DTOs;

import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SchedulingByUserDTO {
    private Long id;
    private UserTypeEnum userType;
}
