import { Genero } from 'src/types/usuario'

export interface EditProfileStateInterface {
  id: string | number[]
  name: string
  birthday?: string
  gender?: Genero
  cpf?: string
  phone?: string
  city?: string
  state?: string
  email?: string
  password?: string
}
