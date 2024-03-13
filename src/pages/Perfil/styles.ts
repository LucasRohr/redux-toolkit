import { StyleSheet } from 'react-native';
import theme from 'src/config/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  headerTitulo: {
    color: 'white'
  },
  tituloContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  ola: {
    marginBottom: 10
  },
  card: {
    padding: 10,
  },
  secao: {
    gap: 10
  },
  secaoTitulo: {
    fontSize: 18
  },
  secaoDivider: {
    height: 2,
    marginVertical: 10,
  },
  atualizar: {
    marginTop: 20
  }
});

export default styles;