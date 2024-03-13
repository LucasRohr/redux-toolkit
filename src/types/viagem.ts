import { ImageSourcePropType } from 'react-native';

export enum TipoViagem {
  ida = 'ida',
  idaEVolta = 'idaEVolta'
}; 
export interface Viagem {
  titulo: string,
  valor: number,
  foto: ImageSourcePropType,
  dataIda: string,
  dataVolta?: string,
  origem: string,
  estadoOrigem: string,
  destino: string,
  tipo: TipoViagem
}