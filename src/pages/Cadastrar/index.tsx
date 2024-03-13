import { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { Button, Card, Checkbox, TextInput, Title } from 'react-native-paper';

import { Genero, Usuario } from 'src/types/usuario';

import banner from 'assets/cadastrar/banner.png';
import DatePicker from 'src/components/DatePicker';
import useSnackbar from 'src/contexts/Snackbar';

import styles from './styles';
import GenderPicker from 'src/components/GenderPicker';
import { cadastrar } from 'src/store/reducers/usuario';
import { useDispatch } from 'react-redux';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootStackParamList } from 'src/routes';

export default function Cadastrar({ navigation }: DrawerScreenProps<RootStackParamList, 'Cadastrar'>) {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [genero, setGenero] = useState<Genero | undefined>();
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [leu, setLeu] = useState(false);
  const { criarMensagem } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!leu) return criarMensagem.erro('Você deve concordar com os termos de uso');
    if (!nome) return criarMensagem.erro('Campo nome é obrigatório');

    const novoUsuario: Omit<Usuario, 'id'> = {
      nome,
      dataNascimento,
      genero,
      cpf,
      telefone,
      cidade,
      estado,
      email,
      senha
    }

    dispatch(cadastrar(novoUsuario));
    criarMensagem.sucesso('Cadastro efetuado com sucesso!');
    navigation.navigate('Home');
  }

  return (
    <ScrollView>
      <Image source={banner} style={styles.banner} />
      <Card style={styles.card}>
        <Title> Crie sua conta </Title>
        <View style={styles.form}>
          <TextInput
            label='Nome completo'
            mode='outlined'
            value={nome}
            onChangeText={setNome}
          />
          <DatePicker
            label='Data de nascimento'
            value={dataNascimento}
            onChangeText={setDataNascimento}
          />
          <GenderPicker value={genero} onChange={setGenero} />
          <TextInput
            label='CPF'
            placeholder='Digite seu CPF'
            mode='outlined'
            value={cpf}
            onChangeText={setCpf}
            style={styles.input}
          />
          <TextInput
            label='Telefone'
            placeholder='+XX XXXXX-XXXX'
            mode='outlined'
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
          />
          <TextInput
            label='Cidade'
            placeholder='Digite sua cidade'
            mode='outlined'
            value={cidade}
            onChangeText={setCidade}
            style={styles.input}
          />
          <TextInput
            label='Estado'
            placeholder='Digite seu estado'
            mode='outlined'
            value={estado}
            onChangeText={setEstado}
            style={styles.input}
          />
          <TextInput
            label='Email'
            placeholder='Digite seu email'
            value={email}
            onChangeText={setEmail}
            mode='outlined'
            style={styles.input}
          />
          <TextInput
            label='Confirmar email'
            placeholder='Digite seu email novamente'
            mode='outlined'
            value={confirmarEmail}
            onChangeText={setConfirmarEmail}
            style={styles.input}
          />
          <TextInput
            label='Senha'
            mode='outlined'
            placeholder='Digite sua senha'
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            mode='outlined'
            label='Confirmar senha'
            placeholder='Repita sua senha'
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            style={styles.input}
            secureTextEntry
          />
          <Pressable onPress={() => setLeu(!leu)}>
            <View style={styles.termosContainer}>
              <Checkbox status={leu ? 'checked' : 'unchecked'}/>
              <Text> Li e aceito os termos e condições deste cadastro </Text>
            </View>
          </Pressable>
          <Button mode='contained' onPress={handleSubmit}>
            Criar minha conta
          </Button>
        </View>
      </Card>
    </ScrollView>
  )
}