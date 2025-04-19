import { ReactNode, useCallback } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/store';
import { closeConfirmModal, openConfirmModal } from 'src/redux/slices';
import { ModalSimple } from '../components';

type Options = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  rejectAction?: () => void;
  action: () => void;
};

type ConfirmModalActions = {
  openConfirmModal: (data: Options) => void;
};

type Props = {
  children: ReactNode;
};

const DEFAULT_OPTIONS: Options = {
  title: 'Confirmar',
  description: 'Tem certeza que deseja realizar essa ação?',
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  action: () => {},
  rejectAction: () => {},
};

export function ConfirmModalProvider({ children }: Readonly<Props>) {
  const dispatch = useDispatch();

  const {
    open,
    title,
    description,
    confirmLabel,
    cancelLabel,
    action,
    rejectAction,
  } = useAppSelector((state) => state.confirmModal);

  const handleClose = useCallback(() => {
    dispatch(closeConfirmModal());
  }, []);

  const handleCancel = useCallback(() => {
    rejectAction();
    handleClose();
  }, [rejectAction]);

  const handleConfirm = useCallback(() => {
    action();
    handleClose();
  }, [action]);

  return (
    <>
      {children}
      <ModalSimple
        open={open}
        title={title}
        handleClose={handleCancel}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
      >
        <Box minWidth="25rem" maxWidth="30rem">
          {description}
        </Box>
      </ModalSimple>
    </>
  );
}

export function useConfirmModal(): ConfirmModalActions {
  const dispatch = useDispatch();

  return {
    openConfirmModal: (data) => {
      dispatch(openConfirmModal({ ...DEFAULT_OPTIONS, ...data }));
    },
  };
}
