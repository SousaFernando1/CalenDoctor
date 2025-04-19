import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { colors } from 'src/styles';
import { Loading } from '../Loading';
import { EmptyListMessage, EmptyListMessageProps } from '../EmptyListMessage';

type Props = {
  children: ReactNode;
  loading: boolean;
  size?: 'small' | 'large';
  empty?: boolean;
  emptyMessageProps?: EmptyListMessageProps;
};

export function LoadingContent({
  children,
  loading,
  emptyMessageProps,
  size = 'large',
  empty = false,
}: Readonly<Props>) {
  if (empty && emptyMessageProps) {
    return <EmptyListMessage {...emptyMessageProps} size={size} />;
  }

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="10rem"
      >
        <Loading loadingColor={colors.primary_300} />
      </Box>
    );
  }

  return <>{children}</>;
}
