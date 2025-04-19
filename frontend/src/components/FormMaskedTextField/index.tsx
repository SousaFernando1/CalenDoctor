import { TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { MaskedTextInput } from '../MaskedTextInput';

type Props = TextFieldProps & {
  control: Control<any, any>;
  name: string;
  mask: string;
  disabled?: boolean;
};

export function FormMaskedTextField({
  mask,
  control,
  name,
  disabled,
  ...rest
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => (
        <MaskedTextInput
          {...rest}
          {...field}
          mask={mask}
          helperText={error?.message ?? ''}
          error={!!error}
        />
      )}
    />
  );
}
