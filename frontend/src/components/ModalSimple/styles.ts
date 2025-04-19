import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from 'src/styles';

export const CustomDialog = styled(Dialog)`
  div.MuiDialog-paper {
    border-radius: 1rem;
    max-width: 60rem;
  }

  div.MuiDialogContent-root {
    padding: 1.5rem;
  }

  div.MuiDialogActions-root {
    padding: 1.5rem;
  }
`;

export const CustomDialogTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.5rem 1.5rem 0 1.5rem;
  white-space: nowrap;

  div {
    display: flex;
    align-items: center;
  }
  div > svg {
    font-size: 1.25rem;
    margin-right: 0.5rem;
    color: ${colors.grey_800};
  }
`;

export const CustomDialogContent = styled(DialogContent)``;

export const CustomDialogActions = styled(DialogActions)`
  justify-content: end;
`;
