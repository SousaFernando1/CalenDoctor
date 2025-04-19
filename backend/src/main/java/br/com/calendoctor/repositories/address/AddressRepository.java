package br.com.calendoctor.repositories.address;

import br.com.calendoctor.entities.address.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findById(Long id);
}
