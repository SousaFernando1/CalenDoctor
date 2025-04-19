import { ButtonProps, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { muiResponsiveValues } from 'src/utils/responsive';
import { ButtonContainer } from './styles';
import { LoadingButton } from '../LoadingButton';
import { Show } from '../Show';

type Props = {
  mt?: string;
  confirmType?: 'reset' | 'button' | 'submit';
  confirmLabel?: string;
  confirmAction?: () => void;
  confirmDisabled?: boolean;
  confirmProps?: ButtonProps;
  cancelLabel?: string;
  cancelDisabled?: boolean;
  cancelLoading?: boolean;
  cancelProps?: ButtonProps;
  cancelAction?: () => void;
  loading?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  form?: string;
  size?: 'small' | 'medium' | 'large';
};

export function FormFooter({
  confirmAction,
  cancelAction,
  confirmDisabled,
  cancelDisabled,
  cancelLoading,
  confirmProps,
  cancelProps,
  rightContent,
  loading,
  leftContent,
  form,
  size,
  mt,
  confirmType = 'submit',
  confirmLabel = 'Salvar',
  cancelLabel = 'Descartar',
}: Readonly<Props>) {
  return (
    <Stack
      mt={mt}
      direction={muiResponsiveValues('column', 'row')}
      justifyContent="space-between"
      gap={2}
    >
      <ButtonContainer>{leftContent}</ButtonContainer>

      <ButtonContainer>
        <Stack
          direction={muiResponsiveValues('column-reverse', 'row')}
          justifyContent="space-between"
          gap="0.625rem"
        >
          {rightContent}

          <Show.When isTrue={!!cancelAction}>
            <LoadingButton
              loading={!!cancelLoading}
              variant="outlined"
              onClick={cancelAction}
              size={size}
              disabled={!!loading || cancelDisabled}
              {...cancelProps}
            >
              {cancelLabel}
            </LoadingButton>
          </Show.When>

          <LoadingButton
            variant="contained"
            type={confirmType}
            onClick={confirmAction}
            form={form}
            size={size}
            loading={!!loading}
            disabled={confirmDisabled || cancelLoading}
            color="inherit"
            {...confirmProps}
          >
            {confirmLabel}
          </LoadingButton>
        </Stack>
      </ButtonContainer>
    </Stack>
  );
}
