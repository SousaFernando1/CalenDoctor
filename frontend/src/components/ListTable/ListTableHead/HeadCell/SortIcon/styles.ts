import styled from '@mui/styled-engine';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { colors } from 'src/styles';

export const Container = styled(Box)`
  padding-left: 0.3rem;
  padding-bottom: 0.3rem;
`;

export const CustomBadge = styled(Badge)`
  .MuiBadge-badge {
    font-size: 0.6rem;
    color: ${colors.grey_500};
  }
`;

export const AscIcon = styled(ArrowUpwardIcon)`
  font-size: 1rem;
  color: ${colors.grey_500};
`;

export const DescIcon = styled(ArrowDownwardIcon)`
  font-size: 1rem;
  color: ${colors.grey_500};
`;
