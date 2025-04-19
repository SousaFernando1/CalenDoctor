package br.com.calendoctor.entities.user.patient;

import br.com.calendoctor.entities.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Table(name = "patient")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@Getter
@Setter
public class Patient  extends User {

    private String observation;

}
