import { TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { SelectInput, SelectInputItem } from '../SelectInput';

type Props = TextFieldProps & {
  menuItems: SelectInputItem[];
  control: Control<any, any>;
  name: string;
  disabled?: boolean;
  loading?: boolean;
  objectValue?: boolean;
  customKey?: string;
};

export function FormSelectField({ control, name, ...rest }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <SelectInput
          {...rest}
          {...field}
          helperText={error?.message ?? ''}
          error={!!error}
        />
      )}
    />
  );
}
