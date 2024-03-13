import { StyleSheet } from 'react-native';
import theme from 'src/config/theme';

const styles = StyleSheet.create({
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
});

export default styles;