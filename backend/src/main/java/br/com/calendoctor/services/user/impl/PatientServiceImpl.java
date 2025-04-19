package br.com.calendoctor.services.user.impl;

import br.com.calendoctor.entities.address.DTOs.AddressDTO;
import br.com.calendoctor.entities.user.collaborator.DTOs.CollaboratorDTO;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import br.com.calendoctor.entities.user.patient.DTOs.PatientDTO;
import br.com.calendoctor.entities.user.patient.Patient;
import br.com.calendoctor.repositories.user.PatientRepository;
import br.com.calendoctor.services.user.PatientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public PatientDTO save(Patient patient, String encryptedPassword) {

        boolean isUpdate = patient.getId() != null;

        Patient newPatient = Patient.builder()
                .id(patient.getId())
                .name(patient.getName())
                .email(patient.getEmail())
                .password(encryptedPassword)
                .cellphone(patient.getCellphone())
                .address(patient.getAddress())
                .firstAccess(!isUpdate)
                .userType(UserTypeEnum.PATIENT)
                .observation(patient.getObservation())
                .build();

        Patient saved = patientRepository.saveAndFlush(newPatient);

        AddressDTO addressDTO = modelMapper.map(saved.getAddress(), AddressDTO.class);

        return new PatientDTO(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getCellphone(),
                addressDTO,
                saved.isFirstAccess(),
                saved.getUserType(),
                saved.getObservation()
        );
    }

    @Override
    public List<PatientDTO> getAll() {

        List<Patient> patients = patientRepository.findAll();

        return patients.stream()
                .map(p -> modelMapper.map(p, PatientDTO.class))
                .toList();
    }

    @Override
    public PatientDTO findById(Long id) {
        var patient =  patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        return modelMapper.map(patient, PatientDTO.class);
    }
}
