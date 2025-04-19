import styled from 'styled-components';

type Props = {
  customWidth: string;
};

export const CustomImage = styled.img<Props>`
  width: ${({ customWidth }) => customWidth};
`;
