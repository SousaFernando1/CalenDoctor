import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FormMaskedTextField,
  FormPasswordField,
  FormSelectField,
  FormTextField,
  Show,
} from 'src/components';
import { FormFooter } from 'src/components/FormFooter';
import { useSuccessModal } from 'src/hooks/successModal';
import { getRoles, saveProfile } from 'src/redux/slices';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { userSchema } from 'src/validators/profile';
import { CreateRoleModal } from './CreateRoleModal';

export function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { openSuccessModal } = useSuccessModal();

  const isEdit = pathname.includes('edit');

  const [modalOpen, setModalOpen] = useState(false);

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(userSchema),
  });

  const {
    user: { roles },
    session,
  } = useAppSelector((state) => ({
    user: state.user,
    session: state.session,
  }));

  const userType = useWatch({
    control,
    name: 'userType',
  });

  const formattedRoles = roles.map((role) => ({
    value: role,
    label: role.description,
  }));

  const handleGetRoles = () => {
    dispatch(getRoles());
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    handleGetRoles();
  };

  useEffect(() => {
    handleGetRoles();
    if (isEdit && session?.user) {
      reset(session.user);
    }
  }, [isEdit]);

  const onSubmit = async (data: any) => {
    const newUser = await dispatch(saveProfile(data)).unwrap();

    if (newUser) {
      openSuccessModal({
        title: `Usuário ${isEdit ? 'atualizado' : 'criado'} com sucesso`,
        description: `O usuário foi ${isEdit ? 'atualizado' : 'criado'} com sucesso`,
        onClose: () => {
          navigate('/view');
        },
      });
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: '50rem',
          width: '100%',
        }}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit, console.log)}>
          <Stack>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormTextField
                  label="Nome Completo"
                  name="name"
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  label="E-mail"
                  name="email"
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormPasswordField
                  label="Senha"
                  name="password"
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <FormMaskedTextField
                  mask="(99) 99999-9999"
                  label="WhatsApp"
                  name="cellphone"
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelectField
                  label="Tipo de usuário"
                  name="userType"
                  control={control}
                  menuItems={[
                    { value: 'COLLABORATOR', label: 'Colaborador' },
                    { value: 'PATIENT', label: 'Paciente' },
                  ]}
                  fullWidth
                  disabled={isEdit}
                />
              </Grid>
              <Grid item xs={12}>
                <Show.When isTrue={userType === 'COLLABORATOR'}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    gap={3}
                  >
                    <FormSelectField
                      label="Cargo"
                      name="role"
                      control={control}
                      menuItems={formattedRoles}
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
                </Show.When>
                <Show.When isTrue={userType === 'PATIENT'}>
                  <FormTextField
                    label="Observação"
                    name="observation"
                    control={control}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Show.When>
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  label="UF"
                  name="address.uf"
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  label="Cidade"
                  name="address.city"
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  label="CEP"
                  name="address.code"
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  label="Endereço"
                  name="address.address"
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  label="Bairro"
                  name="address.district"
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormFooter />
              </Grid>
            </Grid>
          </Stack>
        </form>
      </Card>
      <CreateRoleModal open={modalOpen} handleClose={handleCloseModal} />
    </>
  );
}
