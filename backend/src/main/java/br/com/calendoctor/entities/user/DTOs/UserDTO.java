package br.com.calendoctor.entities.user.DTOs;

import br.com.calendoctor.entities.address.Address;
import br.com.calendoctor.entities.address.DTOs.AddressDTO;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String cellphone;
    private AddressDTO address;
    private boolean firstAccess;
    private UserTypeEnum userType;

}
