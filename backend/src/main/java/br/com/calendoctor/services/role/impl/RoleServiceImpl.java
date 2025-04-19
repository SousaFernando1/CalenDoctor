package br.com.calendoctor.services.role.impl;

import br.com.calendoctor.entities.role.DTOs.RoleDTO;
import br.com.calendoctor.entities.role.Role;
import br.com.calendoctor.entities.scheduling.DTOs.SchedulingTypeDTO;
import br.com.calendoctor.entities.scheduling.SchedulingType;
import br.com.calendoctor.repositories.role.RoleRepository;
import br.com.calendoctor.services.role.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public List<RoleDTO> findAll() {
        List<Role> list =  roleRepository.findAll();

        return list.stream().map(r -> modelMapper.map(r, RoleDTO.class)).toList();

    }

    @Override
    public RoleDTO createRole(RoleDTO roleDTO) {

        var newRole = modelMapper.map(roleDTO, Role.class);

        return modelMapper.map(roleRepository.saveAndFlush(newRole), RoleDTO.class);

    }
}
