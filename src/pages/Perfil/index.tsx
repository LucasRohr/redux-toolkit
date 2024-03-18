import { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Divider, TextInput, Title } from 'react-native-paper'
import Icon from '@expo/vector-icons/MaterialIcons'
import { DrawerScreenProps } from '@react-navigation/drawer'

import { EditProfileStateInterface } from './types'
import styles from './styles'
import DatePicker from 'src/components/DatePicker'
import GenderPicker from 'src/components/GenderPicker'
import { Usuario } from 'src/types/usuario'
import useSnackbar from 'src/contexts/Snackbar'
import theme from 'src/config/theme'
import { RootState } from 'src/store'
import { remove, update } from 'src/store/slices/user'
import { RootStackParamList } from 'src/routes'

export default function Perfil({ navigation }: DrawerScreenProps<RootStackParamList, 'Perfil'>) {
  const [userProfile, setUserProfile] = useState<EditProfileStateInterface>({
    id: '',
    name: '',
    birthday: '',
    city: '',
    cpf: '',
    email: '',
    gender: 'Outro',
    phone: '',
    state: '',
    password: '',
  })
  const [confirmarEmail, setConfirmarEmail] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const { criarMensagem } = useSnackbar()
  const dispatch = useDispatch()
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser)

  useEffect(() => {
    if (loggedUser) {
      setUserProfile({
        id: loggedUser.id,
        name: loggedUser.nome,
        cpf: loggedUser.cpf,
        birthday: loggedUser.dataNascimento,
        email: loggedUser.email,
        phone: loggedUser.telefone,
        gender: loggedUser.genero,
        city: loggedUser.cidade,
        state: loggedUser.estado,
        password: loggedUser.senha,
      })

      setConfirmarSenha(loggedUser.senha ?? '')
    }
  }, [loggedUser])

  const handleSubmit = () => {
    const { id, name, birthday, gender, cpf, phone, city, state, email, password } = {
      ...userProfile,
    }

    const novosDados: Usuario = {
      id: id ?? '',
      nome: name ?? '',
      dataNascimento: birthday,
      genero: gender,
      cpf,
      telefone: phone,
      cidade: city,
      estado: state,
      email,
      senha: password,
    }

    dispatch(update(novosDados))
    criarMensagem.sucesso('Dados alterados com sucesso!')
    navigation.navigate('Home')
  }

  const handleExcluir = () => {
    dispatch(remove(loggedUser?.id ?? ''))
    criarMensagem.sucesso('Conta excluida com sucesso!')
    navigation.navigate('Home')
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <Icon name="account-circle" size={30} color="white" />
        <Title style={styles.headerTitulo}> Meu Perfil </Title>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.tituloContainer}>
            <Title style={styles.ola}> Olá, {userProfile?.name}! </Title>
            <Button mode="contained" buttonColor={theme.colors.error} onPress={handleExcluir}>
              Excluir conta
            </Button>
          </View>
          <View style={styles.secao}>
            <Title style={styles.secaoTitulo}> Dados pessoais </Title>
            <TextInput
              value={userProfile?.name}
              onChangeText={(name) =>
                setUserProfile((prevState) => {
                  return { ...prevState, name }
                })
              }
              mode="outlined"
              label="Nome completo"
            />
            <DatePicker
              value={userProfile?.birthday}
              onChangeText={(birthday) =>
                setUserProfile((prevState) => {
                  return { ...prevState, birthday }
                })
              }
              mode="outlined"
              label="Data de nascimento"
            />
            <GenderPicker
              value={userProfile?.gender}
              onChange={(gender) =>
                setUserProfile((prevState) => {
                  return { ...prevState, gender }
                })
              }
            />
            <TextInput
              mode="outlined"
              label="cpf"
              value={userProfile?.cpf}
              onChangeText={(cpf) =>
                setUserProfile((prevState) => {
                  return { ...prevState, cpf }
                })
              }
            />
            <TextInput
              mode="outlined"
              label="telefone"
              value={userProfile?.phone}
              onChangeText={(phone) =>
                setUserProfile((prevState) => {
                  return { ...prevState, phone }
                })
              }
            />
            <TextInput
              mode="outlined"
              label="cidade"
              value={userProfile?.city}
              onChangeText={(city) =>
                setUserProfile((prevState) => {
                  return { ...prevState, city }
                })
              }
            />
            <TextInput
              mode="outlined"
              label="estado"
              value={userProfile?.state}
              onChangeText={(state) =>
                setUserProfile((prevState) => {
                  return { ...prevState, state }
                })
              }
            />
            <Divider style={styles.secaoDivider} />
          </View>
          <View style={styles.secao}>
            <Title style={styles.secaoTitulo}> Dados de acesso </Title>
            <TextInput
              mode="outlined"
              label="Email"
              value={userProfile?.email}
              onChangeText={(email) =>
                setUserProfile((prevState) => {
                  return { ...prevState, email }
                })
              }
            />
            <TextInput
              mode="outlined"
              label="Confirmar email"
              value={confirmarEmail}
              onChangeText={setConfirmarEmail}
            />
            <TextInput
              mode="outlined"
              label="Senha"
              value={userProfile?.password}
              onChangeText={(password) =>
                setUserProfile((prevState) => {
                  return { ...prevState, password }
                })
              }
              secureTextEntry
            />
            <TextInput
              mode="outlined"
              label="Confirmar senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
          </View>
          <Button mode="contained" style={styles.atualizar} onPress={handleSubmit}>
            Atualizar
          </Button>
        </Card>
      </View>
    </ScrollView>
  )
}
