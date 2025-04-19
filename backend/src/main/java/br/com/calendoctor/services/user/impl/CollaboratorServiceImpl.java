package br.com.calendoctor.services.user.impl;

import br.com.calendoctor.entities.address.DTOs.AddressDTO;
import br.com.calendoctor.entities.role.DTOs.RoleDTO;
import br.com.calendoctor.entities.role.Role;
import br.com.calendoctor.entities.scheduling.DTOs.SchedulingDTO;
import br.com.calendoctor.entities.user.collaborator.Collaborator;
import br.com.calendoctor.entities.user.collaborator.DTOs.CollaboratorDTO;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import br.com.calendoctor.repositories.user.CollaboratorRepository;
import br.com.calendoctor.services.role.RoleService;
import br.com.calendoctor.services.user.CollaboratorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class CollaboratorServiceImpl implements CollaboratorService {

    @Autowired
    CollaboratorRepository collaboratorRepository;

    @Autowired
    RoleService roleService;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public CollaboratorDTO save(Collaborator collaborator, String encryptedPassword) {

        boolean isUpdate = collaborator.getId() != null;

        Role role = collaborator.getRole();
        if (role != null && role.getId() != null) {
            Role existingRole = roleService.findById(role.getId())
                    .orElseThrow(() -> new RuntimeException("Cargo (role) não encontrado"));
            collaborator.setRole(existingRole);
        }

        Collaborator newCollaborator = Collaborator.builder()
                .id(collaborator.getId())
                .name(collaborator.getName())
                .email(collaborator.getEmail())
                .password(encryptedPassword)
                .cellphone(collaborator.getCellphone())
                .address(collaborator.getAddress())
                .firstAccess(!isUpdate)
                .userType(UserTypeEnum.COLLABORATOR)
                .role(collaborator.getRole())
                .build();

        Collaborator saved = collaboratorRepository.saveAndFlush(newCollaborator);



        AddressDTO addressDTO = modelMapper.map(saved.getAddress(), AddressDTO.class);

        return new CollaboratorDTO(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getCellphone(),
                addressDTO,
                saved.isFirstAccess(),
                saved.getUserType(),
                modelMapper.map(saved.getRole(), RoleDTO.class)
        );
    }

    @Override
    public List<CollaboratorDTO> getAll() {
        List<Collaborator> collaborators = collaboratorRepository.findAll();

        return collaborators.stream()
                .map(c -> modelMapper.map(c, CollaboratorDTO.class))
                .toList();
    }

    @Override
    public CollaboratorDTO findById(Long id) {

        var collaborator =  collaboratorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Colaborador não encontrado"));

        return modelMapper.map(collaborator, CollaboratorDTO.class);
    }
}
