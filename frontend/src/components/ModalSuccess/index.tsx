import { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { colors } from 'src/styles';
import {
  CustomDialog,
  CustomDialogTitle,
  CustomDialogContent,
  CustomDialogActions,
  CheckIcon,
} from './styles';
import { LoadingButton } from '../LoadingButton';

export type ModalSuccessProps = {
  title: string | ReactNode;
  open: boolean;
  description: string | ReactNode;

  confirmLabel?: string;
  disabledCloseOnClickOutside?: boolean;
  loading?: boolean;
  handleConfirm: () => void;
};

export function ModalSuccess({
  open,
  title,
  description,
  confirmLabel,
  disabledCloseOnClickOutside,
  loading,
  handleConfirm,
}: ModalSuccessProps) {
  const onClose = (_: any, reason: string) => {
    if (!disabledCloseOnClickOutside) {
      handleConfirm();
    }

    if (reason !== 'backdropClick') {
      handleConfirm();
    }
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      aria-labelledby={`${title}-dialog-title`}
    >
      <CustomDialogTitle id={`${title}-dialog-title`}>
        {typeof title === 'string' ? (
          <span>
            <Typography variant="h6" color={colors.success} pr="2.5rem">
              <CheckIcon />
              {title}
            </Typography>
          </span>
        ) : (
          title
        )}
      </CustomDialogTitle>

      <CustomDialogContent>
        <Typography variant="body1">{description}</Typography>
      </CustomDialogContent>

      <CustomDialogActions>
        <LoadingButton
          fullWidth
          loading={!!loading}
          variant="contained"
          color="inherit"
          onClick={handleConfirm}
        >
          {confirmLabel}
        </LoadingButton>
      </CustomDialogActions>
    </CustomDialog>
  );
}
