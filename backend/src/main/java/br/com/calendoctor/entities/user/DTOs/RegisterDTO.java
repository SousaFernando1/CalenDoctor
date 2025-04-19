package br.com.calendoctor.entities.user.DTOs;

import br.com.calendoctor.entities.address.Address;

import java.time.LocalDateTime;

public record RegisterDTO (String name, String email, String password, String cellphone, Address address) {
}
