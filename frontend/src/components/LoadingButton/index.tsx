import { ReactNode } from 'react';
import { Box, Button, ButtonProps, CircularProgress } from '@mui/material';
import { LoadingContainer } from './styles';
import { Show } from '../Show';

type LoadingButtonProps = ButtonProps & {
  children: ReactNode;
  loading: boolean;
};

export function LoadingButton({
  children,
  loading,
  ...rest
}: LoadingButtonProps) {
  return (
    <Button {...rest} disabled={loading || rest.disabled}>
      <Box position="relative">
        <LoadingContainer>
          {loading && <CircularProgress size={20} color="inherit" />}
        </LoadingContainer>

        <Show.When isTrue={!loading}>
          <Box>{children}</Box>
        </Show.When>
      </Box>
    </Button>
  );
}
