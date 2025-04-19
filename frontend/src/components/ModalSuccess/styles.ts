import {
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styled from 'styled-components';

export const CustomDialog = styled(Dialog)`
  div.MuiDialog-paper {
    border-radius: 1rem;
    min-width: 22rem;
    max-width: 30rem;
  }

  div.MuiDialogContent-root {
    text-align: left;
    padding: 1.7rem;
  }

  div.MuiDialogActions-root {
    padding: 0 1.7rem 1.7rem 1rem;
  }
`;

export const CustomDialogTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 0 0 1.5rem;

  text-align: center;
  white-space: nowrap;

  svg {
    font-size: 1.7rem;
    margin-bottom: -0.4rem;
    margin-right: 1rem;
  }
`;

export const CustomDialogContent = styled(DialogContent)``;

export const CustomDialogActions = styled(DialogActions)`
  margin-left: auto;
`;

export const CheckIcon = styled(CheckCircleOutlineIcon)`
  color: ${({ theme }) => theme.COLORS.success};
  font-size: 1.5rem;
`;
