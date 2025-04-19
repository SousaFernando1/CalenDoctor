package br.com.calendoctor.services.address.impl;

import br.com.calendoctor.entities.address.Address;
import br.com.calendoctor.repositories.address.AddressRepository;
import br.com.calendoctor.services.address.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    AddressRepository addressRepository;

    @Override
    public Address save(Address address) {

        return addressRepository.save(address);
    }

    @Override
    public Optional<Address> findById(Long id) {
        return addressRepository.findById(id);
    }
}
