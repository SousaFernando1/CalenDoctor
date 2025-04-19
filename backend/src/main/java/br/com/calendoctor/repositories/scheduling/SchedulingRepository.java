package br.com.calendoctor.repositories.scheduling;

import br.com.calendoctor.entities.scheduling.Scheduling;
import br.com.calendoctor.entities.scheduling.SchedulingPayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SchedulingRepository extends JpaRepository<Scheduling, Long> {

    List<Scheduling> findAllByStartDateGreaterThanEqualAndEndDateLessThanEqual(
            LocalDateTime start, LocalDateTime end
    );

    List<Scheduling> findAllByPatientId(Long id);
    List<Scheduling> findAllByCollaboratorId(Long id);


}
