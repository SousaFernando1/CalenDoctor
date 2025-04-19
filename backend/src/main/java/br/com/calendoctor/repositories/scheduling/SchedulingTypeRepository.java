package br.com.calendoctor.repositories.scheduling;

import br.com.calendoctor.entities.scheduling.SchedulingType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchedulingTypeRepository extends JpaRepository<SchedulingType, Long> {
}
