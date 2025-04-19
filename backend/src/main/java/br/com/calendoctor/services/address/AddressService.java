package br.com.calendoctor.services.address;

import br.com.calendoctor.entities.address.Address;

import java.util.Optional;

public interface AddressService {

    Address save(Address address);

    Optional<Address> findById(Long id);
}
