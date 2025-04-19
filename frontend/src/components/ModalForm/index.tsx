import { Box, Button, IconButton } from '@mui/material';
import { ReactNode } from 'react';

import { Show } from 'src/components/Show';
import {
  CloseIcon,
  CustomDialog,
  CustomDialogActions,
  CustomDialogContent,
  CustomDialogTitle,
  Title,
} from './styles';
import { LoadingButton } from '../LoadingButton';

export type ModalFormProps = {
  title: string | ReactNode;
  open: boolean;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;

  loading?: boolean;
  hasCloseButton?: boolean;
  noFooter?: boolean;
  confirmDisabled?: boolean;
  cancelDisabled?: boolean;
  confirmFullWidth?: boolean;
  disabledCloseOnClickOutside?: boolean;

  setMaxWidth?: string;
  width?: string;
  height?: string;
  disableFooterBorder?: boolean;
  disablePadding?: boolean;

  handleClose: () => void;
  handleConfirm?: () => void;
  handleCancel?: () => void;
};

export function ModalForm({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel,
  loading,
  disabledCloseOnClickOutside,
  confirmDisabled,
  cancelDisabled,
  confirmFullWidth,
  noFooter,
  hasCloseButton,
  handleClose,
  handleConfirm,
  handleCancel,
  setMaxWidth,
  width,
  height,
  disableFooterBorder,
  disablePadding,
}: Readonly<ModalFormProps>) {
  const showCloseButton = noFooter || hasCloseButton;

  const onClose = (_: any, reason: string) => {
    if (loading) return;

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
      aria-labelledby={`${title}-dialog-form-title`}
      setMaxWidth={setMaxWidth}
      width={width}
      height={height}
    >
      <CustomDialogTitle id={`${title}-dialog-form-title`}>
        <Box width="100%">{title}</Box>

        {showCloseButton && (
          <IconButton onClick={() => onClose(null, '')}>
            <CloseIcon />
          </IconButton>
        )}
      </CustomDialogTitle>

      <CustomDialogContent disablePadding={disablePadding}>
        {children}
      </CustomDialogContent>

      {!noFooter && (
        <CustomDialogActions disableFooterBorder={disableFooterBorder}>
          <Show.When isTrue={!!cancelLabel}>
            <Button
              disabled={cancelDisabled || !!loading}
              variant="outlined"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
          </Show.When>

          <LoadingButton
            fullWidth={confirmFullWidth}
            loading={!!loading}
            disabled={confirmDisabled}
            variant="contained"
            color="inherit"
            onClick={handleConfirm}
          >
            {confirmLabel}
          </LoadingButton>
        </CustomDialogActions>
      )}
    </CustomDialog>
  );
}

ModalForm.defaultProps = {
  loading: false,
  noFooter: false,
  hasCloseButton: false,
  disabledCloseOnClickOutside: false,
  confirmLabel: 'Ok',
  cancelLabel: '',
  confirmDisabled: false,
  cancelDisabled: false,
  handleCancel: undefined,
  handleConfirm: undefined,
  setMaxWidth: undefined,
};
