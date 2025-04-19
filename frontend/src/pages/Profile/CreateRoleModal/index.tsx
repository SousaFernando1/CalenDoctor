import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField } from 'src/components';
import { FormFooter } from 'src/components/FormFooter';
import { ModalForm } from 'src/components/ModalForm';
import { useSuccessModal } from 'src/hooks/successModal';
import { createRole } from 'src/redux/slices';
import { useAppDispatch } from 'src/redux/store';
import { roleSchema } from 'src/validators';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export function CreateRoleModal({ handleClose, open }: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const { openSuccessModal } = useSuccessModal();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(roleSchema),
  });

  const onSubmit = async (data: any) => {
    const newRole = await dispatch(createRole(data)).unwrap();

    if (newRole) {
      handleClose();
      openSuccessModal({
        title: 'Cargo criado com sucesso',
        description: 'O cargo foi criado com sucesso.',
      });
    }
  };

  useEffect(() => {
    if (!open) return;

    reset();
  }, [open, reset]);

  return (
    <ModalForm
      title="Novo cargo"
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
            <FormFooter />
          </Grid>
        </Grid>
      </form>
    </ModalForm>
  );
}
