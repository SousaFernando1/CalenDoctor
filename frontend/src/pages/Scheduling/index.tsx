import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, FormHelperText, Grid, Stack } from '@mui/material';
import { addMinutes, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  FormCheckboxField,
  FormSelectField,
  FormTextField,
  LoadingContent,
  Show,
} from 'src/components';
import { FormDateTimePickerField } from 'src/components/FormDateTimePickerField';
import { FormFooter } from 'src/components/FormFooter';
import { useSuccessModal } from 'src/hooks/successModal';
import { ThunkLoadingEnum } from 'src/interfaces';
import {
  getCollaborators,
  getPatients,
  getTypes,
  updateScheduling,
} from 'src/redux/slices';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { formatDateToRequest } from 'src/utils';
import { schedulingSchema } from 'src/validators/scheduling';
import { CreateTypeModal } from './CreateTypeModal';

export function Scheduling() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { openSuccessModal } = useSuccessModal();

  const { id } = useParams();
  const { state } = useLocation();

  const [modalOpen, setModalOpen] = useState(false);

  const {
    scheduling: { schedulings, types, typesLoading },
    user: { collaborators, patients, patientsLoading, collaboratorsLoading },
  } = useAppSelector((state) => ({
    scheduling: state.scheduling,
    user: state.user,
  }));

  const currentScheduling = schedulings.find(
    (scheduling) => scheduling.id === Number(id),
  );

  const { control, reset, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schedulingSchema),
  });
  const isEdit = Boolean(id);

  const type = useWatch({
    control,
    name: 'type',
  });

  const formattedTypes = types.map((type) => ({
    label: type.description,
    value: type,
  }));

  const formattedCollaborators = collaborators.map((type) => ({
    label: type.name,
    value: type,
  }));

  const formattedPatients = patients.map((type) => ({
    label: type.name,
    value: type,
  }));

  const isLoading = [
    typesLoading,
    patientsLoading,
    collaboratorsLoading,
  ].includes(ThunkLoadingEnum.PENDING);

  const recurrenceType = [
    {
      value: 'diary',
      label: 'Diário',
    },
    {
      value: 'weekly',
      label: 'Semanal',
    },
  ];

  const onSubmit = async (data: any) => {
    const start = new Date(data.startDate);
    const duration = data.type?.defaultDuration ?? 0;
    const recurrenceLength = Number(data.recurrenceLength) || 1;
    const recurrenceType = data.recurrenceType;

    const intervalInDays = recurrenceType === 'weekly' ? 7 : 1;

    const schedulingsToCreate = Array.from({ length: recurrenceLength }).map(
      (_, index) => {
        const schedulingStart = new Date(start);
        schedulingStart.setDate(
          schedulingStart.getDate() + index * intervalInDays,
        );

        const schedulingEnd = addMinutes(schedulingStart, duration);

        return {
          ...data,
          startDate: formatDateToRequest(schedulingStart),
          endDate: formatDateToRequest(schedulingEnd),
        };
      },
    );

    const response = isEdit
      ? await dispatch(updateScheduling(schedulingsToCreate[0])).unwrap()
      : await Promise.all(
          schedulingsToCreate.map((scheduling) =>
            dispatch(updateScheduling(scheduling)).unwrap(),
          ),
        );

    if (response) {
      openSuccessModal({
        title: `Agendamento ${isEdit ? 'atualizado' : 'criado'} com sucesso`,
        description: `O Agendamento foi ${isEdit ? 'atualizado' : 'criado'} com sucesso`,
        onClose: () => {
          navigate('/view');
        },
      });
    }
  };

  const handleGetTypes = () => {
    dispatch(getTypes());
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    handleGetTypes();
  };

  useEffect(() => {
    if (type) {
      setValue('payment.priceValue', type.defaultPrice);
    }
  }, [type]);

  useEffect(() => {
    handleGetTypes();
    dispatch(getCollaborators());
    dispatch(getPatients());
  }, []);

  useEffect(() => {
    if (isEdit && currentScheduling) {
      const parsedStartDate = parseISO(currentScheduling.startDate);
      const calculatedEndDate = addMinutes(
        parsedStartDate,
        currentScheduling.type.defaultDuration ?? 0,
      );

      reset({
        ...currentScheduling,
        startDate: parsedStartDate,
        endDate: calculatedEndDate,
      } as any);
    } else if (state) {
      reset({
        ...state,
        startDate: state?.startDate,
        endDate: state?.endDate,
      });
    }
  }, [currentScheduling]);

  return (
    <>
      <Card
        sx={{
          maxWidth: '50rem',
          width: '100%',
        }}
      >
        <LoadingContent loading={isLoading}>
          <form noValidate onSubmit={handleSubmit(onSubmit, console.log)}>
            <Stack>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormTextField
                    label="Descrição"
                    name="description"
                    control={control}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormTextField
                    label="Valor"
                    name="payment.priceValue"
                    control={control}
                    fullWidth
                    disabled
                  />
                  <FormCheckboxField
                    label="Pago"
                    name="payment.paid"
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Stack
                    direction="row"
                    gap={3}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormSelectField
                      label="Tipo de agendamento"
                      name="type"
                      control={control}
                      menuItems={formattedTypes}
                      objectValue
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      onClick={() => setModalOpen(true)}
                    >
                      ADD
                    </Button>
                  </Stack>

                  <Show.When isTrue={!!type}>
                    <FormHelperText>
                      Duração: {type?.defaultDuration} minutos
                    </FormHelperText>
                  </Show.When>
                </Grid>

                <Grid item xs={6}>
                  <FormDateTimePickerField
                    label="Data de início"
                    name="startDate"
                    control={control}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormSelectField
                    label="Paciente"
                    name="patient"
                    control={control}
                    menuItems={formattedPatients}
                    objectValue
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormSelectField
                    label="Colaborador"
                    name="collaborator"
                    control={control}
                    menuItems={formattedCollaborators}
                    objectValue
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormTextField
                    label="Número de vezes"
                    name="recurrenceLength"
                    control={control}
                    fullWidth
                    disabled={isEdit}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormSelectField
                    label="Tipo de recorrência"
                    name="recurrenceType"
                    control={control}
                    menuItems={recurrenceType}
                    disabled={isEdit}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormFooter />
                </Grid>
              </Grid>
            </Stack>
          </form>
        </LoadingContent>
      </Card>
      <CreateTypeModal open={modalOpen} handleClose={handleCloseModal} />
    </>
  );
}
