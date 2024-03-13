import { Image, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';

import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';

import logo from 'assets/logo.png';

import styles from './styles';

export default function Menu({ navigation }: DrawerHeaderProps) {
  return (
    <Appbar.Header style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={styles.logo}
          source={logo}
        />
      </TouchableOpacity>
      <Appbar.Action
        icon="menu"
        color='white'
        onPress={navigation.openDrawer}
      />
    </Appbar.Header>
  )
}