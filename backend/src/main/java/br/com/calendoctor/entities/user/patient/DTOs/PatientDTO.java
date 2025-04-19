package br.com.calendoctor.entities.user.patient.DTOs;

import br.com.calendoctor.entities.address.DTOs.AddressDTO;
import br.com.calendoctor.entities.user.DTOs.UserDTO;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PatientDTO extends UserDTO {
    private String observation;

    public PatientDTO(Long id,
                      String name,
                      String email,
                      String cellphone,
                      AddressDTO address,
                      boolean firstAccess,
                      UserTypeEnum userType,
                      String observation) {
        super(id, name, email, cellphone, address, firstAccess, userType);
        this.observation = observation;
    }
}