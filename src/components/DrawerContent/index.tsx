import { Text, View } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Button, Drawer } from 'react-native-paper';

import styles from './styles';
import theme from 'src/config/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { deslogar } from 'src/store/reducers/usuario';

export default function DrawerContent({ navigation }: DrawerContentComponentProps) {
  const dispatch = useDispatch();
  const usuarioLogado = useSelector((state: RootState) => state.usuario.usuarioLogado);

  const handleDeslogar = () => {
    dispatch(deslogar());
    navigation.closeDrawer();
  }

  return (
    <DrawerContentScrollView>
      <Drawer.Section style={styles.container}>
        {usuarioLogado && <Text style={styles.nome}> Olá {usuarioLogado?.nome}! </Text>}
        <Button icon='home' mode='contained' onPress={() => navigation.navigate('Home')}>
          Página inicial
        </Button>
        {usuarioLogado && (
          <Button icon='account' mode='contained' onPress={() => navigation.navigate('Perfil')}>
            Editar dados pessoais
          </Button>
        )}
      </Drawer.Section>
      {usuarioLogado
        ?
        (
          <View style={styles.container}>
            <Button
              icon='logout'
              mode='contained'
              buttonColor={theme.colors.error}
              onPress={handleDeslogar}
            >
              Sair
            </Button>
          </View>
        )
        : (
          <Drawer.Section style={styles.container}>
            <Button icon='login' style={[styles.button, styles.login]} onPress={() => navigation.navigate('Login')}>
              Login
            </Button>
            <Button icon='account-arrow-up' style={[styles.button, styles.cadastre]} onPress={() => navigation.navigate('Cadastrar')}>
              <Text style={styles.cadastreTexto}>
                Cadastre-se
              </Text>
            </Button>
          </Drawer.Section>
        )}

    </DrawerContentScrollView>
  )
}
