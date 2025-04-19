import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField } from 'src/components';
import { FormFooter } from 'src/components/FormFooter';
import { ModalForm } from 'src/components/ModalForm';
import { useSuccessModal } from 'src/hooks/successModal';
import { createSchedulingType } from 'src/redux/slices';
import { useAppDispatch } from 'src/redux/store';
import { typeSchema } from 'src/validators/scheduling';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export function CreateTypeModal({ handleClose, open }: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const { openSuccessModal } = useSuccessModal();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(typeSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: any) => {
    const newType = await dispatch(createSchedulingType(data)).unwrap();

    if (newType) {
      handleClose();
      openSuccessModal({
        title: 'Tipo de agendamento criado com sucesso',
        description: 'O tipo de agendamento foi criado com sucesso.',
      });
    }
  };

  useEffect(() => {
    if (!open) return;

    reset();
  }, [open, reset]);

  return (
    <ModalForm
      title="Novo tipo de agendamento"
      handleClose={handleClose}
      open={open}
      setMaxWidth="50rem"
      width="100%"
      noFooter
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              label="Descrição"
              name="description"
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label="Preço padrão"
              name="defaultPrice"
              control={control}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label="Duração padrão (minutos)"
              name="defaultDuration"
              control={control}
              fullWidth
              type="number"
              inputProps={{
                maxLength: 420,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormFooter />
          </Grid>
        </Grid>
      </form>
    </ModalForm>
  );
}
