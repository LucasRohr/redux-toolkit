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
  return (
    <Drawer.Navigator
      drawerContent={props =>
        <DrawerContent {...props} />
      }
      screenOptions={{
        header: Menu,
        drawerPosition: 'right'
      }}
    >
      <Drawer.Screen name='Home'>
        {(props) => <Home {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name='Login'>
        {(props) => <Login {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name='Cadastrar'>
        {(props) => <Cadastrar {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name='Perfil'>
        {(props) => <Perfil {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}