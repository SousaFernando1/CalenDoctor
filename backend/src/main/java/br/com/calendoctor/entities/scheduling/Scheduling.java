package br.com.calendoctor.entities.scheduling;

import br.com.calendoctor.entities.user.collaborator.Collaborator;
import br.com.calendoctor.entities.user.patient.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity(name= "scheduling")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Scheduling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name="description")
    private String description;

    @OneToOne
    @JoinColumn(name="id_scheduling_payment")
    private SchedulingPayment payment;

    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name = "id_scheduling_type")
    private SchedulingType type;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_client")
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_collaborator")
    private Collaborator collaborator;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "recurrence_type")
    private String recurrenceType;

    @Column(name = "recurrence_length")
    private Long recurrenceLength;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public void setPayment(SchedulingPayment payment) {
        this.payment = payment;
        if (payment != null) {
            payment.setScheduling(this);
        }
    }
}
