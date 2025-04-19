// @ts-nocheck
import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import { onlyNumbers } from 'src/utils';

type Props = TextFieldProps & {
  name: string;
  control: Control<any>;
};

export function PhoneField({
  label,
  name,
  required,
  disabled,
  error,
  control,
  helperText,
  ...rest
}: Readonly<Props>) {
  const getPhoneMask = (value: string) => {
    const phoneNumber = onlyNumbers(value ?? '') ?? '';

    if (phoneNumber.length > 10) {
      return '(99) 99999-9999';
    }

    return '(99) 9999-99999';
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
          mask={getPhoneMask(value)}
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
