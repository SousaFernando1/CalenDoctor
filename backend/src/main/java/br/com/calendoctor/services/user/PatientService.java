package br.com.calendoctor.services.user;

import br.com.calendoctor.entities.user.patient.DTOs.PatientDTO;
import br.com.calendoctor.entities.user.patient.Patient;

import java.util.List;

public interface PatientService {
    PatientDTO save(Patient patient, String encryptedPassword );

    List<PatientDTO> getAll();

    PatientDTO findById(Long id);
}
