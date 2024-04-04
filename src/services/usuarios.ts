import server from 'assets/server'
import { Usuario } from 'src/types/usuario'

const usuarios = server.usuarios

export const carregarUsuarios = (): Promise<Usuario[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(usuarios), 1000))
}

export const findUser = (
  users: Usuario[],
  emailOuCpf: Usuario['email'] | Usuario['cpf'],
  senha: Usuario['senha']
) => {
  const usuario = users.find(
    (usuarioNoServidor) =>
      [usuarioNoServidor.cpf, usuarioNoServidor.email].includes(emailOuCpf) &&
      senha === usuarioNoServidor.senha
  )

  return usuario
}
