import { TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { ElementType } from 'react';

import { DateTimePicker } from '../DateTimePicker';

type Props = TextFieldProps & {
  control: Control<any, any>;
  name: string;
  disabled?: boolean;
  views?: any[];
  representation?: 'complete' | 'date' | 'time';
  placeholder?: string;
  onAccept?: (date: string | Date | null) => void;
  disabledDatePicker?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  defaultValue?: Date | null;
  minDate?: any;
  maxDate?: any;
  minDateTime?: any;
  openPickerIcon?: ElementType<any> | null;
  openPickerIconPosition?: 'end' | 'start';
};

export function FormDateTimePickerField({
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
        <DateTimePicker
          {...rest}
          {...field}
          value={field.value ?? null}
          disabled={disabled}
          helperText={error?.message ?? ''}
          error={!!error}
        />
      )}
    />
  );
}
