package br.com.calendoctor.services.scheduling.impl;

import br.com.calendoctor.entities.expense.DTOs.ExpenseDTO;
import br.com.calendoctor.entities.expense.Expense;
import br.com.calendoctor.entities.scheduling.DTOs.SchedulingDTO;
import br.com.calendoctor.entities.scheduling.DTOs.SchedulingPaymentWithSchedulingDTO;
import br.com.calendoctor.entities.scheduling.DTOs.SchedulingTypeDTO;
import br.com.calendoctor.entities.scheduling.Scheduling;
import br.com.calendoctor.entities.scheduling.SchedulingPayment;
import br.com.calendoctor.entities.scheduling.SchedulingType;
import br.com.calendoctor.entities.user.enums.UserTypeEnum;
import br.com.calendoctor.repositories.scheduling.SchedulingPaymentRepository;
import br.com.calendoctor.repositories.scheduling.SchedulingRepository;
import br.com.calendoctor.repositories.scheduling.SchedulingTypeRepository;
import br.com.calendoctor.repositories.user.CollaboratorRepository;
import br.com.calendoctor.repositories.user.PatientRepository;
import br.com.calendoctor.services.scheduling.SchedulingService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class SchedulingServiceImpl implements SchedulingService {

    @Autowired
    SchedulingRepository schedulingRepository;

    @Autowired
    SchedulingPaymentRepository schedulingPaymentRepository;

    @Autowired
    SchedulingTypeRepository schedulingTypeRepository;

    @Autowired
    CollaboratorRepository collaboratorRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    @Transactional
    public SchedulingDTO save(Scheduling scheduling) {

        var collaborator = collaboratorRepository.findById(scheduling.getCollaborator().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Colaborador não encontrado."));

        var patient = patientRepository.findById(scheduling.getPatient().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente não encontrado."));

        var type = schedulingTypeRepository.findById(scheduling.getType().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de atendimento não encontrado."));

        scheduling.setCollaborator(collaborator);
        scheduling.setPatient(patient);
        scheduling.setType(type);

        SchedulingPayment incomingPayment = scheduling.getPayment(); // pode ser novo ou existente
        scheduling.setPayment(null); // evita persistência automática por cascade

        // Salva ou atualiza o scheduling primeiro
        scheduling = schedulingRepository.save(scheduling);

        if (incomingPayment != null) {
            SchedulingPayment paymentToSave;

            if (incomingPayment.getId() != null) {
                // Atualização: buscar existente
                paymentToSave = schedulingPaymentRepository.findById(incomingPayment.getId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pagamento não encontrado."));
                paymentToSave.setPriceValue(incomingPayment.getPriceValue());
                paymentToSave.setPaid(incomingPayment.isPaid());
            } else {
                // Criação
                paymentToSave = incomingPayment;
            }

            paymentToSave.setScheduling(scheduling);
            schedulingPaymentRepository.save(paymentToSave);

            scheduling.setPayment(paymentToSave); // só para devolver no DTO
        }

        return modelMapper.map(scheduling, SchedulingDTO.class);
    }

    @Override
        public List<SchedulingDTO> findByPeriod(LocalDateTime start, LocalDateTime end) {
            List<Scheduling> schedulings = schedulingRepository
                    .findAllByStartDateGreaterThanEqualAndEndDateLessThanEqual(start, end);

            return schedulings.stream()
                    .map(s -> modelMapper.map(s, SchedulingDTO.class))
                    .toList();
        }

    @Override
    public List<SchedulingDTO> findByUser(Long id, UserTypeEnum userType) {
        List<Scheduling> list;

        if(userType.equals(UserTypeEnum.PATIENT)){
            list = schedulingRepository.findAllByPatientId(id);
        } else {
            list = schedulingRepository.findAllByCollaboratorId(id);
        }

        return list.stream()
                .map(s -> modelMapper.map(s, SchedulingDTO.class))
                .toList();
    }

    @Override
    public List<SchedulingTypeDTO> getTypes() {

        List<SchedulingType> list = schedulingTypeRepository.findAll();

        return list.stream()
                .map(s -> modelMapper.map(s, SchedulingTypeDTO.class))
                .toList();
    }

    @Override
    public SchedulingTypeDTO createType(SchedulingTypeDTO schedulingTypeDTO) {

        var newSchedulingType = modelMapper.map(schedulingTypeDTO, SchedulingType.class);

        return modelMapper.map(schedulingTypeRepository.saveAndFlush(newSchedulingType), SchedulingTypeDTO.class);

    }

    @Override
    public Page<SchedulingPaymentWithSchedulingDTO> findByPeriodPaged(LocalDateTime startDate, LocalDateTime endDate, int page, int size) {

        Page<SchedulingPayment> list = schedulingPaymentRepository.findByPaymentDateBetween(
                startDate,
                endDate,
                PageRequest.of(page, size)
        );

        return list.map(e -> modelMapper.map(e, SchedulingPaymentWithSchedulingDTO.class));
    }


}

