import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Provider as RNPProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import Routes from 'src/routes';
import theme from 'src/config/theme';
import { SnackbarProvider } from 'src/contexts/Snackbar';

export default function App() {
  return (
      <RNPProvider theme={theme}>
        <SnackbarProvider>
          <NavigationContainer>
            <StatusBar />
            <Routes />
          </NavigationContainer>
        </SnackbarProvider>
      </RNPProvider>
  );
}