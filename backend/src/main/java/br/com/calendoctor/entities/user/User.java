package br.com.calendoctor.entities.user;

import br.com.calendoctor.entities.address.Address;
import br.com.calendoctor.entities.user.collaborator.Collaborator;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import br.com.calendoctor.entities.user.patient.Patient;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SuperBuilder
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "userType",
        visible = true
)

@JsonSubTypes({
        @JsonSubTypes.Type(value = Patient.class, name = "PATIENT"),
        @JsonSubTypes.Type(value = Collaborator.class, name = "COLLABORATOR")
})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "cellphone")
    private String cellphone;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_address")
    private Address address;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name= "first_access")
    @Builder.Default()
    private boolean firstAccess = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type")
    private UserTypeEnum userType;

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
