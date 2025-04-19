package br.com.calendoctor.repositories.scheduling;

import br.com.calendoctor.entities.scheduling.SchedulingPayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface SchedulingPaymentRepository extends JpaRepository<SchedulingPayment, Long> {

    Page<SchedulingPayment> findByPaymentDateBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

}
