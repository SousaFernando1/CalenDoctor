package br.com.calendoctor.repositories.user;

import br.com.calendoctor.entities.user.collaborator.Collaborator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {
}
