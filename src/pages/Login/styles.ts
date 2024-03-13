import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  banner: {
    height: 100,
    width: '100%'
  },
  card: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 40,
    paddingVertical: 20
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    width: '100%'
  },
  loginContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    height: 200,
    width: 200
  },
  titulo: {
    fontSize: 25,
    marginVertical: 30,
  },
  loginForm: {
    flex: 1,
    gap: 10
  },
  cadastrar: {
    marginTop: 30,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  cadastrarLink: {
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});

export default styles;