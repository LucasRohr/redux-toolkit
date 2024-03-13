export type Genero = 'Feminino' | 'Masculino' | 'Outro';

export interface Usuario {
  id: string | number[],
  nome: string,
  dataNascimento?: string,
  genero?: Genero,
  cpf?: string,
  telefone?: string,
  cidade?: string,
  estado?: string,
  email?: string,
  senha?: string,
}
