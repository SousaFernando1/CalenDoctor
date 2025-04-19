package br.com.calendoctor.controllers.patients;

import br.com.calendoctor.entities.user.patient.DTOs.PatientDTO;
import br.com.calendoctor.services.user.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/patients")
public class PatientsController {

    @Autowired
    PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PatientDTO>> getPatients() {
        return ResponseEntity.ok(patientService.getAll());
    }
}
