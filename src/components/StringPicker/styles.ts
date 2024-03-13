import { StyleSheet } from "react-native";
import theme from "src/config/theme";

const styles = StyleSheet.create({
  dialog: {
    gap: 5,
    paddingHorizontal: 20
  },
  opcao: {
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary
  }
});

export default styles;