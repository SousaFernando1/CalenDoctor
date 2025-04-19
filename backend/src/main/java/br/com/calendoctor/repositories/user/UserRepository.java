package br.com.calendoctor.repositories.user;

import br.com.calendoctor.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<UserDetails> findByEmail(String email);
    Optional<User> findUserByEmail(String email);
}
