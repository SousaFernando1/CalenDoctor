import Close from '@mui/icons-material/Close';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  css,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { rgba } from 'polished';
import { colors } from 'src/styles';

type CustomDialogProps = {
  setMaxWidth?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
};

type CustomDialogActionsProps = {
  disableFooterBorder?: boolean;
};

type CustomDialogContentProps = {
  disablePadding?: boolean;
};

export const CustomDialog = styled(Dialog, {
  shouldForwardProp: (props) => props !== 'setMaxWidth',
})<CustomDialogProps>`
  div.MuiDialog-paper {
    border-radius: 1rem;
    max-width: 60rem;
    ${({ setMaxWidth }) =>
      setMaxWidth &&
      css`
        max-width: ${setMaxWidth};
      `};
    ${({ width }) =>
      width &&
      css`
        width: ${width};
      `};
    ${({ height }) =>
      height &&
      css`
        height: ${height};
      `};
    ${({ backgroundColor }) =>
      backgroundColor &&
      css`
        background-color: ${backgroundColor};
      `};
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

  border-bottom: 0.063rem solid ${rgba(colors.grey_500, 0.24)};
  padding: 1.5rem;
`;

export const CustomDialogContent = styled(DialogContent, {
  shouldForwardProp: (props) => props !== 'disablePadding',
})<CustomDialogContentProps>`
  ${({ disablePadding }) =>
    disablePadding &&
    css`
      padding: 0 !important;
    `}
`;

export const CustomDialogActions = styled(DialogActions, {
  shouldForwardProp: (props) => props !== 'disableFooterBorder',
})<CustomDialogActionsProps>`
  justify-content: end;

  ${({ disableFooterBorder }) =>
    !disableFooterBorder &&
    css`
      border-top: 0.063rem solid ${rgba(colors.grey_500, 0.24)};
    `}
`;

export const Title = styled(Typography)`
  white-space: normal;
`;

export const CloseIcon = styled(Close)`
  color: ${colors.grey_600};
`;
