import { CircularProgress, styled, css } from '@mui/material';
import { colors } from 'src/styles';

type LoadingStyleProps = {
  loadingColor?: string;
};

export const Loading = styled(CircularProgress, {
  shouldForwardProp: (props) => props !== 'loadingColor',
})<LoadingStyleProps>`
  &.MuiCircularProgress-root {
    margin: 0 auto;
    color: ${colors.primary};

    ${({ loadingColor }) =>
      !!loadingColor &&
      css`
        color: ${loadingColor} !important;
      `}
  }
`;
