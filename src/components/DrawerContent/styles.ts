import { StyleSheet } from 'react-native';
import theme from 'src/config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
  headerButtonText: {
    color: theme.colors.primary
  },
  login: {
    borderColor: theme.colors.outline,
  },
  cadastre: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  cadastreTexto: {
    color: theme.colors.white
  },
  nome: {
    fontSize: 20,
    // textAlign: 'center'
  }
})

export default styles;