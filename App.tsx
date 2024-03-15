import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Provider as RNPProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';

import Routes from 'src/routes';
import theme from 'src/config/theme';
import { SnackbarProvider } from 'src/contexts/Snackbar';
import store from 'src/store';

export default function App() {
  return (
    <ReduxProvider store={store} >
        <RNPProvider theme={theme}>
          <SnackbarProvider>
            <NavigationContainer>
              <StatusBar />
              <Routes />
            </NavigationContainer>
          </SnackbarProvider>
        </RNPProvider>
    </ReduxProvider>
  );
}