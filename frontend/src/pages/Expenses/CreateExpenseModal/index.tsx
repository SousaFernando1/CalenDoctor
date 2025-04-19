import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormSelectField, FormTextField } from 'src/components';
import { FormFooter } from 'src/components/FormFooter';
import { ModalForm } from 'src/components/ModalForm';
import { useSuccessModal } from 'src/hooks/successModal';
import { createExpense, getExpensesType } from 'src/redux/slices';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { expenseSchema } from 'src/validators';
import { CreateTypeModal } from './CreateTypeModal';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export function CreateExpenseModal({ handleClose, open }: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const { openSuccessModal } = useSuccessModal();

  const [openModal, setModalOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(expenseSchema),
  });

  const handleGetTypes = () => {
    dispatch(getExpensesType());
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    handleGetTypes();
  };

  const { expensesType } = useAppSelector((state) => state.expense);

  const onSubmit = async (data: any) => {
    const newExpense = await dispatch(createExpense(data)).unwrap();

    if (newExpense) {
      handleClose();
      openSuccessModal({
        title: 'Despesa criada com sucesso',
        description: 'A despesa foi criada com sucesso.',
      });
    }
  };

  const formattedTypes = expensesType.map((type) => ({
    value: type,
    label: `${type.description} - ${type.frequency}`,
  }));

  useEffect(() => {
    handleGetTypes();
  }, []);

  useEffect(() => {
    if (!open) return;

    reset();
  }, [open, reset]);

  return (
    <>
      <ModalForm
        title="Nova despesa"
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
            <Grid item xs={6}>
              <FormTextField
                label="Valor"
                name="value"
                control={control}
                fullWidth
                type="number"
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
                  label="Tipo de despesa"
                  name="type"
                  control={control}
                  menuItems={formattedTypes}
                  objectValue
                  fullWidth
                />
                <Button variant="contained" onClick={() => setModalOpen(true)}>
                  ADD
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <FormFooter />
            </Grid>
          </Grid>
        </form>
      </ModalForm>
      <CreateTypeModal handleClose={handleCloseModal} open={openModal} />
    </>
  );
}
