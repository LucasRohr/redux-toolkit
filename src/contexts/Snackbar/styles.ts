import { StyleSheet } from 'react-native';
import theme from 'src/config/theme';

const styles = StyleSheet.create({
  error: {
    backgroundColor: theme.colors.error
  },
  info: {
    backgroundColor: theme.colors.info
  },
  success: {
    backgroundColor: theme.colors.success
  },
  warning: {
    backgroundColor: theme.colors.warning
  },
});

export default styles;