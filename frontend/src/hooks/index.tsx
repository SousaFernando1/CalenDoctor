import { ReactNode } from 'react';
import { SnackbarProvider } from './snackbar';
import { SuccessModalProvider } from './successModal';
import { ConfirmModalProvider } from './confirmModal';
import { SimpleModalProvider } from './simpleModal';

type Props = {
  children: ReactNode;
};

export function AppHooksProviders({ children }: Readonly<Props>) {
  return (
    <SnackbarProvider>
      <ConfirmModalProvider>
        <SimpleModalProvider>
          <SuccessModalProvider>{children}</SuccessModalProvider>
        </SimpleModalProvider>
      </ConfirmModalProvider>
    </SnackbarProvider>
  );
}
