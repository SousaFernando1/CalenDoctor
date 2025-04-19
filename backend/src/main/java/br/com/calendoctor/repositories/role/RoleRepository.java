package br.com.calendoctor.repositories.role;

import br.com.calendoctor.entities.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findById(Long id);

}
