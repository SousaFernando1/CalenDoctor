// @ts-nocheck
import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import { onlyNumbers } from 'src/utils';

type Props = TextFieldProps & {
  name: string;
  control: Control<any>;
};

export function SalaryField({
  label,
  name,
  required,
  disabled,
  error,
  control,
  helperText,
  ...rest
}: Readonly<Props>) {
  const getSalaryMask = (value: string) => {
    const salaryNumber = onlyNumbers(value ?? '') ?? '';

    if (salaryNumber.length > 4) {
      return 'R$ 99.999';
    }

    return 'R$ 9.9999';
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <ReactInputMask
          mask={getSalaryMask(value)}
          alwaysShowMask={false}
          maskChar=""
          type="text"
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        >
          {() => (
            <TextField
              fullWidth
              {...rest}
              label={label}
              InputLabelProps={{
                required,
              }}
              disabled={disabled}
              error={!!error}
              helperText={error?.message ?? ''}
            />
          )}
        </ReactInputMask>
      )}
    />
  );
}
