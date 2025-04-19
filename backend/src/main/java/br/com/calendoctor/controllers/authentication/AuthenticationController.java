package br.com.calendoctor.controllers.authentication;

import br.com.calendoctor.entities.address.Address;
import br.com.calendoctor.entities.role.Role;
import br.com.calendoctor.entities.user.DTOs.AuthenticationDTO;
import br.com.calendoctor.entities.user.DTOs.LoginResponseDTO;
import br.com.calendoctor.entities.user.DTOs.RegisterDTO;
import br.com.calendoctor.entities.user.DTOs.UserDTO;
import br.com.calendoctor.entities.user.User;
import br.com.calendoctor.entities.user.collaborator.Collaborator;
import br.com.calendoctor.entities.user.collaborator.DTOs.CollaboratorDTO;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import br.com.calendoctor.entities.user.patient.DTOs.PatientDTO;
import br.com.calendoctor.infra.security.TokenService;
import br.com.calendoctor.repositories.user.UserRepository;
import br.com.calendoctor.services.user.CollaboratorService;
import br.com.calendoctor.services.user.PatientService;
import br.com.calendoctor.services.user.UserService;
import org.hibernate.usertype.UserType;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;
    @Autowired
    private CollaboratorService collaboratorService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthenticationDTO authenticationDTO) {
        var userPassword = new UsernamePasswordAuthenticationToken(authenticationDTO.email(), authenticationDTO.password());
        var auth = this.authenticationManager.authenticate(userPassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        var user = userService.findUserByEmail(authenticationDTO.email());

        Object userDTO;

        if (user.getUserType() == UserTypeEnum.COLLABORATOR) {
            var collaborator = collaboratorService.findById(user.getId());
            userDTO = modelMapper.map(collaborator, CollaboratorDTO.class);
        } else if (user.getUserType() == UserTypeEnum.PATIENT) {
            var patient = patientService.findById(user.getId());
            userDTO = modelMapper.map(patient, PatientDTO.class);
        } else {
            userDTO = modelMapper.map(user, UserDTO.class);
        }
        return ResponseEntity.ok(new LoginResponseDTO(token, (UserDTO) userDTO));
    }

    @PostMapping("/start")
    public ResponseEntity start() {

        Address address = Address.builder()
                .uf("SC")
                .city("Tubarão")
                .address("Rua um")
                .code("88888888")
                .district("Bairro")
                .build();

        Role role = Role.builder()
                .description("Admin")
                .build();

        Collaborator collaborator = Collaborator.builder()
                .name("Colaborador")
                .email("admin@admin.com")
                .password("123")
                .address(address)
                .cellphone("48999999999")
                .userType(UserTypeEnum.COLLABORATOR)
                .role(role)
                .build();

        userService.save(collaborator);

        return ResponseEntity.ok("Start realizado com sucesso!");
    }


}

