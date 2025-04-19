import { ReactNode, useCallback } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/redux/store';
import { closeSimpleModal, openSimpleModal } from 'src/redux/slices';
import { ModalSimple } from '../components';

type Options = {
  title?: string;
  description?: ReactNode;
  simpleLabel?: string;
  cancelLabel?: string;
  rejectAction?: () => void;
  action: () => void;
};

type SimpleModalActions = {
  openSimpleModal: (data: Options) => void;
};

type Props = {
  children: ReactNode;
};

const DEFAULT_OPTIONS: Options = {
  title: '',
  description: 'Tem certeza que deseja realizar essa ação?',
  simpleLabel: 'Ok',
  cancelLabel: 'Cancelar',
  action: () => {},
  rejectAction: () => {},
};

export function SimpleModalProvider({ children }: Readonly<Props>) {
  const dispatch = useDispatch();

  const { open, title, description, simpleLabel, action, rejectAction } =
    useAppSelector((state) => state.simpleModal);

  const handleClose = useCallback(() => {
    dispatch(closeSimpleModal());
  }, []);

  const handleCancel = useCallback(() => {
    rejectAction();
    handleClose();
  }, [rejectAction]);

  const handleSimple = useCallback(() => {
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
        handleConfirm={handleSimple}
        confirmLabel={simpleLabel}
      >
        <Box minWidth="25rem" maxWidth="50rem">
          {description}
        </Box>
      </ModalSimple>
    </>
  );
}

export function useSimpleModal(): SimpleModalActions {
  const dispatch = useDispatch();

  return {
    openSimpleModal: (data) => {
      dispatch(openSimpleModal({ ...DEFAULT_OPTIONS, ...data }));
    },
  };
}
