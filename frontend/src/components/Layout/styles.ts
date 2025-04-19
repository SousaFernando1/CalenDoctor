import { Stack } from '@mui/material';
import styled from 'styled-components';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { rgba } from 'polished';
import TodayIcon from '@mui/icons-material/Today';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export const HeaderContainer = styled(Stack)`
  background-color: ${({ theme }) => theme.COLORS.white};
`;

export const ArrowDownIcon = styled(KeyboardArrowDownRounded)`
  color: ${({ theme }) => theme.COLORS.grey_500};
`;

export const Container = styled(Stack)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => rgba(theme.COLORS.primary_100, 0.16)};
`;

export const SchedulingIcon = styled(TodayIcon)`
  font-size: 1.5rem;
`;

export const PaymentsIcon = styled(MoneyOffIcon)`
  font-size: 1.5rem;
`;

export const NewUserIcon = styled(PersonAddAlt1Icon)`
  font-size: 1.5rem;
`;
