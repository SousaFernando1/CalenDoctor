package br.com.calendoctor.services.role;

import br.com.calendoctor.entities.role.DTOs.RoleDTO;
import br.com.calendoctor.entities.role.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Optional<Role> findById(Long id);

    List<RoleDTO> findAll();

    RoleDTO createRole(RoleDTO roleDTO);
}
