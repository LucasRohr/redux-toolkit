import { View, ScrollView } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import styles from './styles';
import { Button, Card, Divider, TextInput, Title } from 'react-native-paper';
import DatePicker from 'src/components/DatePicker';
import { useState } from 'react';
import GenderPicker from 'src/components/GenderPicker';
import { Usuario } from 'src/types/usuario';
import { excluirUsuario, mudarDadosUsuario } from 'src/services/usuarios';
import useSnackbar from 'src/contexts/Snackbar';
import theme from 'src/config/theme';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootStackParamList } from 'src/routes';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export default function Perfil({ navigation }: DrawerScreenProps<RootStackParamList, "Perfil">) {
  const usuarioLogado = useSelector((state: RootState) => state.usuario.usuarioLogado);
  const [nome, setNome] = useState(usuarioLogado?.nome);
  const [dataNascimento, setDataNascimento] = useState(usuarioLogado?.dataNascimento);
  const [genero, setGenero] = useState(usuarioLogado?.genero);
  const [cpf, setCpf] = useState(usuarioLogado?.cpf);
  const [telefone, setTelefone] = useState(usuarioLogado?.telefone);
  const [cidade, setCidade] = useState(usuarioLogado?.cidade);
  const [estado, setEstado] = useState(usuarioLogado?.estado);
  const [email, setEmail] = useState(usuarioLogado?.email);
  const [confirmarEmail, setConfirmarEmail] = useState(usuarioLogado?.email);
  const [senha, setSenha] = useState(usuarioLogado?.senha);
  const [confirmarSenha, setConfirmarSenha] = useState(usuarioLogado?.senha);
  const { criarMensagem } = useSnackbar();

  const handleSubmit = () => {
    // const novosDados: Usuario = {
    //   id: usuarioLogado?.id,
    //   nome,
    //   dataNascimento,
    //   genero,
    //   cpf,
    //   telefone,
    //   cidade,
    //   estado,
    //   email,
    //   senha
    // }
    // mudarDadosUsuario(novosDados);
    // setUsuarioLogado(novosDados);
    criarMensagem.sucesso('Dados alterados com sucesso!');
    navigation.navigate('Home');
  }

  const handleExcluir = () => {
    // excluirUsuario(usuarioLogado.id);
    // setUsuarioLogado(undefined);
    criarMensagem.sucesso('Conta excluida com sucesso!');
    navigation.navigate('Home');
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <Icon name='account-circle' size={30} color='white' />
        <Title style={styles.headerTitulo}> Meu Perfil </Title>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.tituloContainer}>
            <Title style={styles.ola}> Olá, {usuarioLogado?.nome}! </Title>
            <Button mode='contained' buttonColor={theme.colors.error} onPress={handleExcluir}>
              Excluir conta
            </Button>
          </View>
          <View style={styles.secao}>
            <Title style={styles.secaoTitulo}> Dados pessoais </Title>
            <TextInput
              value={nome}
              onChangeText={setNome}
              mode='outlined'
              label='Nome completo'
            />
            <DatePicker
              value={dataNascimento}
              onChangeText={setDataNascimento}
              mode='outlined'
              label='Data de nascimento'
            />
            <GenderPicker value={genero} onChange={setGenero} />
            <TextInput
              mode='outlined'
              label='cpf'
              value={cpf}
              onChangeText={setCpf}
            />
            <TextInput
              mode='outlined'
              label='telefone'
              value={telefone}
              onChangeText={setTelefone}
            />
            <TextInput
              mode='outlined'
              label='cidade'
              value={cidade}
              onChangeText={setCidade}
            />
            <TextInput
              mode='outlined'
              label='estado'
              value={estado}
              onChangeText={setEstado}
            />
            <Divider style={styles.secaoDivider} />
          </View>
          <View style={styles.secao}>
            <Title style={styles.secaoTitulo}> Dados de acesso </Title>
            <TextInput
              mode='outlined'
              label='Email'
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              mode='outlined'
              label='Confirmar email'
              value={confirmarEmail}
              onChangeText={setConfirmarEmail}
            />
            <TextInput
              mode='outlined'
              label='Senha'
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
            <TextInput
              mode='outlined'
              label='Confirmar senha'
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
          </View>
          <Button mode='contained' style={styles.atualizar} onPress={handleSubmit}>
            Atualizar
          </Button>
        </Card>
      </View>
    </ScrollView>
  )
}