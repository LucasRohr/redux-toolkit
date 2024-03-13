import { StyleSheet } from "react-native";
import theme from "src/config/theme";

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    height: 400,
    position: "relative",
    width: "100%",
  },
  bannerImage: {
    width: "100%",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  passagensContent: {
    marginBottom: 30,
    padding: 20,
  },
  passagensTitulo: {
    fontSize: 25,
    marginBottom: 30,
  },
  tipoContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tipoIda: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  tipoIdaEVolta: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  tipoSelecionado: {
    backgroundColor: theme.colors.secondary,
  },
  pessoasPicker: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    marginVertical: 10,
  },
  origemContainer: {
    width: "100%",
  },
  origem: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  trocar: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 0,
    height: 30,
    justifyContent: "center",
  },
  destino: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  datas: {
    gap: 10,
    marginVertical: 10,
  },
  viagemPor: {
    marginBottom: 10,
    backgroundColor: theme.colors.secondary
  },
  buscarContainer: {
    flexDirection: "row",
    gap: 50,
    justifyContent: "space-between",
    marginTop: 10,
  },
  botaoResetarBusca: {
    backgroundColor: theme.colors.accent,
    flex: 2,
  },
  botaoBuscar: {
    flex: 1,
  },
  viagensTitulo: {
    fontSize: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  viagens: {
    gap: 20,
    paddingHorizontal: 20,
  },
  viagemContainer: {
    backgroundColor: theme.colors.tertiary,
    borderColor: theme.colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
  },
  viagemImagem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
  },
  viagemDescricao: {
    gap: 15,
    padding: 20,
  },
  detalheTitulo: {
    fontWeight: 'bold'
  },
  viagemTitulo: {
    color: theme.colors.primary,
    fontSize: 25,
  },
  viagemDetalhes: {
    flex: 1,
    gap: 10,
  },
  verDetalhes: {
    marginHorizontal: 30,
    marginBottom: 10,
  },
  viagemValorContainer: {
    justifyContent: "flex-end",
  },
  viagemValor: {
    color: theme.colors.grey,
    fontSize: 25,
    textAlign: "center",
  },
  inputDisabled: {
    opacity: 0.8,
  },
  buscandoContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    margin: 20,
    padding: 20,
  },
  buscandoText: {
    textAlign: 'center',
  }
});

export default styles;
