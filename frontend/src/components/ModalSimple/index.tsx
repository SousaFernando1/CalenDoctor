import { ReactNode } from 'react';
import { Button, IconButton, Typography } from '@mui/material';

import { Close } from '@mui/icons-material';
import {
  CustomDialog,
  CustomDialogTitle,
  CustomDialogContent,
  CustomDialogActions,
} from './styles';
import { LoadingButton } from '../LoadingButton';

export type ModalSimpleProps = {
  title: string;
  open: boolean;
  children: ReactNode;

  icon?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  noFooter?: boolean;
  noHeader?: boolean;
  confirmDisabled?: boolean;
  cancelDisabled?: boolean;
  disabledCloseOnClickOutside?: boolean;
  showHeaderCloseButton?: boolean;
  handleClose: () => void;
  handleConfirm?: () => void;
  handleCancel?: () => void;
};

export function ModalSimple({
  open,
  title,
  icon,
  children,
  confirmLabel,
  cancelLabel,
  loading,
  disabledCloseOnClickOutside,
  confirmDisabled,
  cancelDisabled,
  noFooter,
  noHeader,
  showHeaderCloseButton,
  handleClose,
  handleConfirm,
  handleCancel,
}: Readonly<ModalSimpleProps>) {
  const onClose = (_: any, reason: string) => {
    if (!disabledCloseOnClickOutside) {
      handleClose();
    }

    if (reason !== 'backdropClick') {
      handleClose();
    }
  };

  const onCancel = () => {
    if (!handleCancel) {
      handleClose();
    } else {
      handleCancel();
    }
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      aria-labelledby={`${title}-dialog-title`}
    >
      {!noHeader && (
        <CustomDialogTitle id={`${title}-dialog-title`}>
          <div>
            {icon}

            <span>
              <Typography variant="h6">{title}</Typography>
            </span>
          </div>
          {showHeaderCloseButton && (
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          )}
        </CustomDialogTitle>
      )}

      <CustomDialogContent>{children}</CustomDialogContent>

      {!noFooter && (
        <CustomDialogActions>
          {cancelLabel && (
            <Button
              disabled={cancelDisabled || !!loading}
              variant="outlined"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
          )}
          {confirmLabel && (
            <LoadingButton
              loading={!!loading}
              disabled={confirmDisabled}
              variant="contained"
              color="inherit"
              onClick={handleConfirm}
            >
              {confirmLabel}
            </LoadingButton>
          )}
        </CustomDialogActions>
      )}
    </CustomDialog>
  );
}

ModalSimple.defaultProps = {
  confirmLabel: 'Ok',
  cancelLabel: '',
  loading: false,
  noFooter: false,
  noHeader: false,
  confirmDisabled: false,
  cancelDisabled: false,
  disabledCloseOnClickOutside: false,
  showHeaderCloseButton: false,
  icon: undefined,
  handleCancel: undefined,
  handleConfirm: undefined,
};
