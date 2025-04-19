package br.com.calendoctor.services.expense.impl;

import br.com.calendoctor.entities.expense.DTOs.ExpenseTypeDTO;
import br.com.calendoctor.entities.expense.ExpenseType;
import br.com.calendoctor.repositories.expense.ExpenseTypeRepository;
import br.com.calendoctor.services.expense.ExpenseTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseTypeServiceImpl implements ExpenseTypeService {

    @Autowired
    ExpenseTypeRepository expenseTypeRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<ExpenseTypeDTO> findAll() {
        List<ExpenseType> list =  expenseTypeRepository.findAll();

        return list.stream().map(l -> modelMapper.map(l, ExpenseTypeDTO.class)).toList();
    }

    @Override
    public ExpenseType findById(Long id) {

        return expenseTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("Tipo de desepsa não encontrado"));



    }

    @Override
    public ExpenseTypeDTO save(ExpenseTypeDTO expenseTypeDTO) {

        var newType = modelMapper.map(expenseTypeDTO, ExpenseType.class);

        return modelMapper.map(expenseTypeRepository.save(newType), ExpenseTypeDTO.class);
    }
}
