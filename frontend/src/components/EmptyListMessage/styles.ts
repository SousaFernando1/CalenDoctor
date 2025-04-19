import { styled, css } from '@mui/material';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import { colors } from 'src/styles';

type Props = {
  size?: string;
};

export const AlertIcon = styled(ReportProblemRoundedIcon)<Props>`
  font-size: 4.8rem;
  color: ${colors.warn};

  ${({ size }) =>
    size &&
    css`
      font-size: ${size};
    `}
`;
