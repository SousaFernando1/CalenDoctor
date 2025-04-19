import { ReactNode, useCallback } from 'react';
import { Snackbar, Slide } from '@mui/material';
import { openSnackbar, closeSnackbar } from 'src/redux/slices/snackbar';
import { useAppDispatch, useAppSelector } from 'src/redux/store';

type SnackbarData = {
  message: string;
  duration?: number;
};

type SnackbarActions = {
  showMessage: (data: SnackbarData) => void;
};

type Props = {
  children: ReactNode;
};

export function SnackbarProvider({ children }: Props) {
  const dispatch = useAppDispatch();
  const { open, message, duration } = useAppSelector((state) => state.snackbar);

  const handleClose = useCallback(() => {
    dispatch(closeSnackbar());
  }, [dispatch, closeSnackbar]);

  return (
    <>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={duration}
        message={message}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ '.MuiPaper-root': { justifyContent: 'center' } }}
      />
    </>
  );
}

export function useSnackbar(): SnackbarActions {
  const dispatch = useAppDispatch();

  return {
    showMessage: (data) => {
      dispatch(openSnackbar(data));
    },
  };
}
