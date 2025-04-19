import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';

type Props = TextFieldProps & {
  control: Control<any, any>;
  name: string;
  disabled?: boolean;
};

export function FormTextField({ control, name, ...rest }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...rest}
          {...field}
          InputLabelProps={{
            shrink: !!field.value,
          }}
          helperText={error?.message ?? ''}
          error={!!error}
        />
      )}
    />
  );
}
