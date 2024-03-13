import { useState } from 'react';
import { Text, View, Image, KeyboardAvoidingView } from 'react-native';
import { Button, Card, TextInput, Title } from 'react-native-paper';

import useSnackbar from 'src/contexts/Snackbar';
import { logar } from 'src/store/reducers/usuario';

import banner from 'assets/login/banner.png';
import icon from 'assets/login/icon.png';
import styles from './styles';
import { useHeaderHeight } from '@react-navigation/elements';
import { useDispatch } from 'react-redux';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootStackParamList } from 'src/routes';

export default function Login({ navigation }: DrawerScreenProps<RootStackParamList, 'Login'>) {
  const [emailOuCpf, setEmailOuCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { criarMensagem } = useSnackbar();
  const height = useHeaderHeight();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!emailOuCpf) return criarMensagem.erro('Preencha um Email ou CPF');
    if (!senha) return criarMensagem.erro('Preencha sua senha');

    try {
      dispatch(logar({ emailOuCpf, senha }));
      criarMensagem.sucesso('Login efetuado com sucesso!');
      navigation.navigate('Home');
    } catch (erro) {
      if (erro instanceof Error) {
        criarMensagem.erro(erro.message);
      }
    }
  }

  return (
    <View>
      <Image source={banner} style={styles.banner} />
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={height + 50}>
        <Card style={styles.card}>
          <View style={styles.loginContainer}>
            <Image source={icon} style={styles.icon} />
            <Title style={styles.titulo}> Login </Title>
            <View style={styles.loginContent}>
              <View style={styles.loginForm}>
                <TextInput
                  label='Email ou CPF'
                  mode='outlined'
                  value={emailOuCpf}
                  onChangeText={setEmailOuCpf}
                />
                <TextInput
                  label='Senha'
                  mode='outlined'
                  secureTextEntry={!mostrarSenha}
                  right={<TextInput.Icon icon="eye" onPress={() => setMostrarSenha(!mostrarSenha)} />}
                  value={senha}
                  onChangeText={setSenha}
                />
                <Button mode='contained' onPress={handleLogin}>
                  Acessar minha conta
                </Button>
              </View>
            </View>
            <Text style={styles.cadastrar}>
              Ainda não possui sua conta?
            </Text>
            <Text style={styles.cadastrarLink} onPress={() => navigation.navigate('Cadastrar')}>
              Clique aqui para se cadastrar!
            </Text>
          </View>
        </Card>
      </KeyboardAvoidingView>
    </View>
  )
}