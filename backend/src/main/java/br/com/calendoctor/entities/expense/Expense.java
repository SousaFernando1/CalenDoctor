package br.com.calendoctor.entities.expense;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity(name= "expense")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="description")
    private String description;

    @Column(name="value")
    private Double value;

    @Column(name = "paid")
    private boolean paid;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name="id_type")
    private ExpenseType type;

    @PrePersist
    @PreUpdate
    public void prePersistOrUpdate() {
        if (this.paid && this.paymentDate == null) {
            this.paymentDate = LocalDateTime.now();
        }
    }
}
