import { StyleSheet } from 'react-native';
import theme from 'src/config/theme';

const styles = StyleSheet.create({
  banner: {
    height: 100,
    width: '100%'
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 20
  },
  form: {
    gap: 10,
  },
  tipo: {
    color: theme.colors.primary
  },
  checkboxContainer: {
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  inputs: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1
  },
  termosContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});

export default styles;