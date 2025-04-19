package br.com.calendoctor.services.user;

import br.com.calendoctor.entities.user.DTOs.RegisterDTO;
import br.com.calendoctor.entities.user.DTOs.UserDTO;
import br.com.calendoctor.entities.user.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {

    User save(RegisterDTO registerDTO);

    UserDTO save(User user);

    UserDetails findByEmail(String email);

    User findUserByEmail(String email);

}
