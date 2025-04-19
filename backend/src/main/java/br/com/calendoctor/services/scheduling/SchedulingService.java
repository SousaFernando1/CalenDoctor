package br.com.calendoctor.services.scheduling;

import br.com.calendoctor.entities.scheduling.DTOs.SchedulingDTO;
import br.com.calendoctor.entities.scheduling.DTOs.SchedulingPaymentWithSchedulingDTO;
import br.com.calendoctor.entities.scheduling.DTOs.SchedulingTypeDTO;
import br.com.calendoctor.entities.scheduling.Scheduling;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

public interface SchedulingService {

    SchedulingDTO save(Scheduling scheduling);

    List<SchedulingDTO> findByPeriod(LocalDateTime start, LocalDateTime end);

    List<SchedulingDTO> findByUser(Long id, UserTypeEnum userType);

    List<SchedulingTypeDTO> getTypes();
    SchedulingTypeDTO createType(SchedulingTypeDTO schedulingTypeDTO);

    Page<SchedulingPaymentWithSchedulingDTO> findByPeriodPaged(LocalDateTime startDate, LocalDateTime endDate, int page, int size);


}
