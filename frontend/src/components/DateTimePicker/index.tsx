import { ElementType } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import {
  DateOrTimeView,
  DateTimePicker as MuiDateTimePicker,
} from '@mui/x-date-pickers';

type Props = TextFieldProps & {
  value: string | Date | null;
  onChange: (value: string | Date | null) => void;
  views?: DateOrTimeView[];
  representation?: 'complete' | 'date' | 'time';
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

export function DateTimePicker({
  value,
  onChange,
  onAccept,
  label,
  disabledDatePicker,
  minDate,
  maxDate,
  minDateTime,
  disableFuture,
  disablePast,
  openPickerIcon,
  views = ['year', 'day', 'hours', 'minutes'],
  openPickerIconPosition = 'end',
  error,
  helperText,
  required,
}: Readonly<Props>) {
  const InputAdornmentProps =
    openPickerIcon === null
      ? { style: { display: 'none' } }
      : { position: openPickerIconPosition };

  const getDate = (date: any) => {
    if (!date) return undefined;

    return new Date(date);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBrLocale}
    >
      <MuiDateTimePicker
        ampm={false}
        views={views}
        minDate={getDate(minDate)}
        maxDate={getDate(maxDate)}
        minDateTime={minDateTime}
        label={label}
        value={value}
        disabled={disabledDatePicker}
        disableFuture={disableFuture}
        disablePast={disablePast}
        onChange={(value) => {
          if (value === null) return;
          onChange(value);
        }}
        slotProps={{
          textField: {
            error,
            helperText,
            fullWidth: true,
            required,
          },
        }}
        onAccept={onAccept}
        InputAdornmentProps={InputAdornmentProps}
      />
    </LocalizationProvider>
  );
}
