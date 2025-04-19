import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { ModalSuccess } from '../components';
import { closeSuccessModal, openSuccessModal } from '../redux/slices';

type SuccessModalData = {
  title: string | ReactNode;
  description: string | ReactNode;
  onClose?: Function;
};

type SuccessModalActions = {
  openSuccessModal: (data: SuccessModalData) => void;
};

interface ProviderProps {
  children: ReactNode;
}

export const SuccessModalProvider = ({ children }: ProviderProps) => {
  const dispatch = useAppDispatch();
  const { open, title, description, onClose } = useAppSelector(
    (state) => state.successModal,
  );

  const handleClose = () => {
    dispatch(closeSuccessModal());
    if (onClose) onClose();
  };

  return (
    <>
      {children}
      <ModalSuccess
        open={open}
        handleConfirm={handleClose}
        title={title}
        description={description}
        confirmLabel="Ok"
      />
    </>
  );
};

export function useSuccessModal(): SuccessModalActions {
  const dispatch = useAppDispatch();

  return {
    openSuccessModal: (data) => {
      dispatch(openSuccessModal(data));
    },
  };
}
