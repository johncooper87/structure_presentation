import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';
import DateFnsUtils from '@date-io/date-fns';
import { Provider as StoreProvider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'react-router';

import { store, history, queryClient } from '.';
import theme from './theme';

interface AppProviderProps {
  children?: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils}>
          <StoreProvider store={store}>
            <QueryClientProvider client={queryClient}>
              <Router history={history}>{children}</Router>
            </QueryClientProvider>
          </StoreProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default AppProvider;
