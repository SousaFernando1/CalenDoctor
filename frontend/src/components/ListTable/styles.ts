import { TableContainer } from '@mui/material';
import styled, { css } from 'styled-components';

type ContainerProps = {
  disableShadow: boolean | undefined;
};

export const Container = styled.div<ContainerProps>`
  border-radius: 0.5rem;

  box-shadow: ${({ theme }) => theme.SHADOWS.cards};

  ${({ disableShadow }) =>
    disableShadow &&
    css`
      box-shadow: none;
    `}
`;

export const StyledTableContainer = styled(TableContainer)`
  border-radius: 0.5rem;
`;

export const StyledTableHeader = styled(TableContainer)`
  border-radius: 0.5rem;
`;
