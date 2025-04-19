import { CheckboxProps, IconButton } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Show } from '../Show';

type Props = CheckboxProps & {
  control: Control<any, any>;
  name: string;
  disabled?: boolean;
  cb?: (value: boolean) => void;
};

export function FormRangeField({
  control,
  name,
  disabled,
  cb,
}: Readonly<Props>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const handleChangeValue = (value: boolean) => () => {
          onChange(value);
          cb?.(value);
        };

        return (
          <Show>
            <Show.When isTrue={!value}>
              <IconButton onClick={handleChangeValue(true)} disabled={disabled}>
                <ArrowRightAltIcon />
              </IconButton>
            </Show.When>
            <Show.Else>
              <IconButton
                onClick={handleChangeValue(false)}
                disabled={disabled}
              >
                <ArrowLeftIcon />
              </IconButton>
            </Show.Else>
          </Show>
        );
      }}
    />
  );
}
