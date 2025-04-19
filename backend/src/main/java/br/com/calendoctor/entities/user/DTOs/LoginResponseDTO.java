package br.com.calendoctor.entities.user.DTOs;

public record LoginResponseDTO(String token, UserDTO user) {
}
