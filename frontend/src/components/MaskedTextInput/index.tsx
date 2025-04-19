// @ts-nocheck
import { TextField, TextFieldProps } from '@mui/material';
import { ReactNode, forwardRef } from 'react';
import InputMask from 'react-input-mask';
import { removeMask } from 'src/utils';

type Props = TextFieldProps & {
  mask: string;
};

export const MaskedTextInput = forwardRef(function MaskedTextInput(
  { mask, disabled, defaultValue, value, onBlur, onChange, ...rest }: Props,
  ref,
) {
  const renderField = () =>
    (<TextField ref={ref} {...rest} disabled={disabled} />) as ReactNode;

  return (
    <InputMask
      onBlur={onBlur}
      onChange={onChange}
      value={removeMask(value as any) ?? ''}
      alwaysShowMask={false}
      maskChar={null}
      mask={mask}
      disabled={disabled}
    >
      {renderField}
    </InputMask>
  );
});
