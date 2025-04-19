import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  CheckboxProps,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type Props = CheckboxProps & {
  control: Control<any, any>;
  name: string;
  label: string;
  disabled?: boolean;
};

export function FormCheckboxField({
  control,
  name,
  label,
  disabled,
}: Readonly<Props>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error} component="fieldset" disabled={disabled}>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(event) => onChange(event.target.checked)}
                value={value}
              />
            }
            label={label}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
