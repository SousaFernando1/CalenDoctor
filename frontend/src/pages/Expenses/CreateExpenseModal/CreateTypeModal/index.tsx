import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormSelectField, FormTextField } from 'src/components';
import { FormFooter } from 'src/components/FormFooter';
import { ModalForm } from 'src/components/ModalForm';
import { useSuccessModal } from 'src/hooks/successModal';
import { createExpenseType, getExpensesType } from 'src/redux/slices';
import { useAppDispatch } from 'src/redux/store';
import { expenseTypeSchema } from 'src/validators';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const frequencyList = [
  {
    value: 'Aleatório',
    label: 'Aleatório',
  },
  {
    value: 'Diário',
    label: 'Diário',
  },
  {
    value: 'Mensal',
    label: 'Mensal',
  },
  {
    value: 'Anual',
    label: 'Anual',
  },
];

export function CreateTypeModal({ handleClose, open }: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const { openSuccessModal } = useSuccessModal();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(expenseTypeSchema),
  });

  const handleGetTypes = () => {
    dispatch(getExpensesType());
  };

  const onSubmit = async (data: any) => {
    const newExpenseType = await dispatch(createExpenseType(data)).unwrap();

    if (newExpenseType) {
      handleClose();
      openSuccessModal({
        title: 'Tipo de despesa criado com sucesso',
        description: 'O tipo de despesa foi criado com sucesso.',
      });
    }
  };

  useEffect(() => {
    handleGetTypes();
  }, []);

  useEffect(() => {
    if (!open) return;

    reset();
  }, [open, reset]);

  return (
    <ModalForm
      title="Novo tipo de despesa"
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
            <FormSelectField
              label="Frequência"
              name="frequency"
              menuItems={frequencyList}
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
