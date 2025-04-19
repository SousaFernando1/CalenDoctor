package br.com.calendoctor.services.user;

import br.com.calendoctor.entities.user.collaborator.Collaborator;
import br.com.calendoctor.entities.user.collaborator.DTOs.CollaboratorDTO;

import java.util.List;

public interface CollaboratorService {

    CollaboratorDTO save(Collaborator collaborator, String encryptedPassword);

    List<CollaboratorDTO> getAll();

    CollaboratorDTO findById(Long id);
}
