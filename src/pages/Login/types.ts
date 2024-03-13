import { Dispatch, SetStateAction } from 'react';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootStackParamList } from 'src/routes';
import { Usuario } from 'src/types/usuario';

export interface LoginProps extends DrawerScreenProps<RootStackParamList, 'Login'> {
  setUsuarioLogado: Dispatch<SetStateAction<Usuario | undefined>>
}