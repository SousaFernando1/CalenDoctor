package br.com.calendoctor.entities.scheduling;

import jakarta.persistence.*;
import lombok.*;

@Entity(name= "scheduling_type")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SchedulingType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "default_price")
    private Double defaultPrice;

    @Column(name = "default_duration")
    private Long defaultDuration;

}
