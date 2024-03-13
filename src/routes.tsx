import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './components/Menu';
import DrawerContent from './components/DrawerContent';
import Cadastrar from './pages/Cadastrar';
import { useState } from 'react';
import { Usuario } from './types/usuario';
import Perfil from './pages/Perfil';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cadastrar: undefined;
  Perfil: undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

export default function Routes() {
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | undefined>();

  return (
    <Drawer.Navigator
      drawerContent={props =>
        <DrawerContent
          {...props}
          usuarioLogado={usuarioLogado}
          setUsuarioLogado={setUsuarioLogado}
        />
      }
      screenOptions={{
        header: Menu,
        drawerPosition: 'right'
      }}
    >
      <Drawer.Screen name='Home'>
        {(props) => <Home {...props} usuarioLogado={usuarioLogado} />}
      </Drawer.Screen>
      <Drawer.Screen name='Login'>
        {(props) => <Login {...props} setUsuarioLogado={setUsuarioLogado} />}
      </Drawer.Screen>
      <Drawer.Screen name='Cadastrar'>
        {(props) => <Cadastrar {...props} setUsuarioLogado={setUsuarioLogado} />}
      </Drawer.Screen>
      <Drawer.Screen name='Perfil'>
        {(props) => <Perfil {...props} usuarioLogado={usuarioLogado as Usuario} setUsuarioLogado={setUsuarioLogado} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}