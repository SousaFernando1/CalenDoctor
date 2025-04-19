package br.com.calendoctor.controllers.collaborators;

import br.com.calendoctor.entities.role.DTOs.RoleDTO;
import br.com.calendoctor.entities.user.collaborator.DTOs.CollaboratorDTO;
import br.com.calendoctor.services.role.RoleService;
import br.com.calendoctor.services.user.CollaboratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/collaborators")
public class CollaboratorsController {

    @Autowired
    CollaboratorService collaboratorService;

    @Autowired
    RoleService roleService;

    @GetMapping
    public ResponseEntity<List<CollaboratorDTO>> getCollaborators() {
        return ResponseEntity.ok(collaboratorService.getAll());
    }

    @GetMapping("/role")
    public ResponseEntity<List<RoleDTO>> getRoles() {
        return ResponseEntity.ok(roleService.findAll());
    }


    @PostMapping("/role")
    public ResponseEntity<RoleDTO> createRole(@RequestBody RoleDTO roleDTO) {
        return ResponseEntity.ok(roleService.createRole(roleDTO));
    }

}
