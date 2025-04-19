import { createGlobalStyle } from 'styled-components';
import { fonts } from '.';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${[fonts.montserrat, fonts.sansSerif].join(',')};
  }

  button {
    cursor: pointer;
  }

  a {
    font-style: normal;
    font-variant: normal;
    text-decoration: none;
  }
`;
