import { TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { ElementType } from 'react';
import { DateView } from '@mui/x-date-pickers';
import { DatePicker } from '../DatePicker';

type Props = TextFieldProps & {
  control: Control<any, any>;
  name: string;
  disabled?: boolean;
  representation?: 'complete' | 'date' | 'time';
  placeholder?: string;
  label?: string;
  onAccept?: (date: string | Date | null) => void;
  disabledDatePicker?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  defaultValue?: Date | null;
  minDate?: any;
  maxDate?: any;
  openPickerIcon?: ElementType<any> | null;
  openPickerIconPosition?: 'end' | 'start';
  views?: DateView[];
};

export function FormDatePickerField({
  control,
  name,
  disabled,
  ...rest
}: Readonly<Props>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...rest}
          {...field}
          value={field.value ?? null}
          disabled={disabled}
          error={!!error}
          helperText={error?.message ?? ''}
        />
      )}
    />
  );
}
