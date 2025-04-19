package br.com.calendoctor.entities.scheduling;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity(name= "scheduling_payment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SchedulingPayment {

    @Id
    @Column(name = "id_scheduling")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id_scheduling")
    private Scheduling scheduling;


    @Column(name = "price_value")
    private BigDecimal priceValue;

    @Column(name = "paid")
    private boolean paid;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @PrePersist
    @PreUpdate
    public void prePersistOrUpdate() {
        if (this.paid && this.paymentDate == null) {
            this.paymentDate = LocalDateTime.now();
        }
    }
}
