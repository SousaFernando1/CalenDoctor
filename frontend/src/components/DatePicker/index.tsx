import { ElementType } from 'react';
import { TextFieldProps } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateView, DatePicker as MUIDatePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';

type Props = TextFieldProps & {
  value: string | Date | null;
  onChange: (value: string | Date | null) => void;
  views?: DateView[];
  representation?: 'complete' | 'date' | 'time';
  onAccept?: (date: string | Date | null) => void;
  disabledDatePicker?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  defaultValue?: Date | null;
  minDate?: any;
  maxDate?: any;
  openPickerIcon?: ElementType<any> | null;
  openPickerIconPosition?: 'end' | 'start';
  error?: boolean;
  helperText?: string;
};

export function DatePicker({
  value,
  onChange,
  onAccept,
  label,
  disabledDatePicker,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
  views = ['year', 'day'],
  error,
  helperText,
  required,
}: Readonly<Props>) {
  const parsedValue = typeof value === 'string' ? new Date(value) : value;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <MUIDatePicker
        views={views}
        minDate={minDate}
        maxDate={maxDate}
        label={label}
        value={parsedValue}
        disabled={disabledDatePicker}
        disableFuture={disableFuture}
        disablePast={disablePast}
        onChange={onChange}
        onAccept={onAccept}
        slotProps={{
          textField: {
            error,
            helperText,
            fullWidth: true,
            required,
          },
        }}
      />
    </LocalizationProvider>
  );
}
