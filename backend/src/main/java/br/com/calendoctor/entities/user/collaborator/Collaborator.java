package br.com.calendoctor.entities.user.collaborator;

import br.com.calendoctor.entities.role.Role;
import br.com.calendoctor.entities.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Table(name = "collaborator")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@Getter
@Setter
public class Collaborator extends User {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_role")
    private Role role;
}
