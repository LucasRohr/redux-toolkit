import { Text, View } from 'react-native'
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import { Button, Drawer } from 'react-native-paper'

import styles from './styles'
import theme from 'src/config/theme'
import { logout } from 'src/store/slices/user'
import { useAppDispatch, useAppSelector } from 'src/hooks'

interface DrawerContentProps extends DrawerContentComponentProps {}

export default function DrawerContent({ navigation }: DrawerContentProps) {
  const dispatch = useAppDispatch()
  const loggedUser = useAppSelector((state) => state.user.loggedUser)

  const deslogar = () => {
    dispatch(logout())
    navigation.closeDrawer()
  }

  return (
    <DrawerContentScrollView>
      <Drawer.Section style={styles.container}>
        {loggedUser && <Text style={styles.nome}> Olá {loggedUser?.nome}! </Text>}
        <Button icon="home" mode="contained" onPress={() => navigation.navigate('Home')}>
          Página inicial
        </Button>
        {loggedUser && (
          <Button icon="account" mode="contained" onPress={() => navigation.navigate('Perfil')}>
            Editar dados pessoais
          </Button>
        )}
      </Drawer.Section>
      {loggedUser ? (
        <View style={styles.container}>
          <Button
            icon="logout"
            mode="contained"
            buttonColor={theme.colors.error}
            onPress={deslogar}
          >
            Sair
          </Button>
        </View>
      ) : (
        <Drawer.Section style={styles.container}>
          <Button
            icon="login"
            style={[styles.button, styles.login]}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Button>
          <Button
            icon="account-arrow-up"
            style={[styles.button, styles.cadastre]}
            onPress={() => navigation.navigate('Cadastrar')}
          >
            <Text style={styles.cadastreTexto}>Cadastre-se</Text>
          </Button>
        </Drawer.Section>
      )}
    </DrawerContentScrollView>
  )
}
