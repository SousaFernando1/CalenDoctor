package br.com.calendoctor.entities.user.collaborator.DTOs;

import br.com.calendoctor.entities.address.DTOs.AddressDTO;
import br.com.calendoctor.entities.role.DTOs.RoleDTO;
import br.com.calendoctor.entities.user.DTOs.UserDTO;
import br.com.calendoctor.entities.role.Role;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CollaboratorDTO extends UserDTO {
    private RoleDTO role;

    public CollaboratorDTO(Long id,
                           String name,
                           String email,
                           String cellphone,
                           AddressDTO address,
                           boolean firstAccess,
                           UserTypeEnum userType,
                           RoleDTO role) {
        super(id, name, email, cellphone, address, firstAccess, userType);
        this.role = role;
    }
}