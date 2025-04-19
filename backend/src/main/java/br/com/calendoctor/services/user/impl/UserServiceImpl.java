package br.com.calendoctor.services.user.impl;

import br.com.calendoctor.entities.address.Address;
import br.com.calendoctor.entities.address.DTOs.AddressDTO;
import br.com.calendoctor.entities.user.DTOs.RegisterDTO;
import br.com.calendoctor.entities.user.DTOs.UserDTO;
import br.com.calendoctor.entities.user.User;
import br.com.calendoctor.entities.user.collaborator.Collaborator;
import br.com.calendoctor.entities.user.collaborator.DTOs.CollaboratorDTO;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import br.com.calendoctor.entities.user.patient.DTOs.PatientDTO;
import br.com.calendoctor.entities.user.patient.Patient;
import br.com.calendoctor.repositories.user.CollaboratorRepository;
import br.com.calendoctor.repositories.user.PatientRepository;
import br.com.calendoctor.repositories.user.UserRepository;
import br.com.calendoctor.services.address.AddressService;
import br.com.calendoctor.services.user.CollaboratorService;
import br.com.calendoctor.services.user.PatientService;
import br.com.calendoctor.services.user.UserService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    UserRepository userRepository;


    @Autowired
    PatientService patientService;

    @Autowired
    CollaboratorService collaboratorService;

    @Autowired
    ModelMapper modelMapper;



    @Autowired
    AddressService addressService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com email: " + email));

    }

    @Override
    public User save(RegisterDTO registerDTO) {
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.password());

        User newUser = User.builder()
                .name(registerDTO.name())
                .email(registerDTO.email())
                .password(encryptedPassword)
                .cellphone(registerDTO.cellphone())
                .address(registerDTO.address())
                .build();

        return userRepository.saveAndFlush(newUser);
    }

    @Override
    @Transactional
    public UserDTO save(User user) {
        boolean isUpdate = user.getId() != null;

        if(!isUpdate) {
            Optional<User> existingUser = userRepository.findUserByEmail(user.getEmail());
            if(existingUser.isPresent()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail já existente");
            }
        }

        String password = user.getPassword();

        if (isUpdate && (password == null || password.isBlank())) {
            User existingUser = userRepository.findById(user.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado para atualização"));
            password = existingUser.getPassword();
        } else {
            if(password == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe uma senha para o usuário");
                password = new BCryptPasswordEncoder().encode(password);
        }
        Address address = user.getAddress();

        if (address != null && address.getId() != null) {
            Address existingAddress = addressService.findById(address.getId())
                    .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));

            existingAddress.setUf(address.getUf());
            existingAddress.setCity(address.getCity());
            existingAddress.setCode(address.getCode());
            existingAddress.setAddress(address.getAddress());
            existingAddress.setDistrict(address.getDistrict());

            user.setAddress(existingAddress);
        }


        if (user.getUserType() == UserTypeEnum.PATIENT && user instanceof Patient patient) {
            return patientService.save(patient, password);

        } else if (user.getUserType() == UserTypeEnum.COLLABORATOR && user instanceof Collaborator collaborator) {
           return collaboratorService.save(collaborator, password);
        }

        User newUser = User.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .password(password)
                .cellphone(user.getCellphone())
                .address(user.getAddress())
                .firstAccess(!isUpdate)
                .userType(user.getUserType())
                .build();

        User saved = userRepository.saveAndFlush(newUser);

        AddressDTO addressDTO = modelMapper.map(saved.getAddress(), AddressDTO.class);

        return new UserDTO(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getCellphone(),
                addressDTO,
                saved.isFirstAccess(),
                saved.getUserType()
        );
    }

    @Override
    public UserDetails findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }
}
