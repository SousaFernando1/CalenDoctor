package br.com.calendoctor.repositories.user;

import br.com.calendoctor.entities.user.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
