import { Card } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const CustomCard = styled(Card)``;

export const CustomForm = styled.form`
  height: 100%;
`;
