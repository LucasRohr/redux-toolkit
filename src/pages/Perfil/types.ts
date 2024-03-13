import { DrawerScreenProps } from '@react-navigation/drawer';
import { Dispatch, SetStateAction } from 'react';
import { RootStackParamList } from 'src/routes';
import { Usuario } from 'src/types/usuario';

export interface PerfilProps extends DrawerScreenProps<RootStackParamList, "Perfil">{
  usuarioLogado: Usuario,
  setUsuarioLogado: Dispatch<SetStateAction<Usuario | undefined>>
}
