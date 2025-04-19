import { ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'src/redux/store';
import { MUITheme } from 'src/styles';
import { AppHooksProviders } from 'src/hooks';
import { GlobalStyle } from 'src/styles/global';
import theme from 'src/styles/theme';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Readonly<Props>) {
  return (
    <ReduxProvider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <MUIThemeProvider theme={MUITheme}>
            <AppHooksProviders>{children}</AppHooksProviders>
          </MUIThemeProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </ReduxProvider>
  );
}
