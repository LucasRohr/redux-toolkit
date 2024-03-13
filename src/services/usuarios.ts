import server from "assets/server";
import { Usuario } from "src/types/usuario";
import uuid from "react-native-uuid";

const usuarios = server.usuarios;

export const carregarUsuarios = (): Promise<Usuario[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(usuarios), 1000));
};

export const cadastrarUsuario = (novoUsuario: Omit<Usuario, "id">): Usuario => {
  const usuarioComId = { ...novoUsuario, id: uuid.v4() };
  usuarios.push(usuarioComId);
  return usuarioComId;
};

export const logar = (emailOuCpf: Usuario['email'] | Usuario['cpf'], senha: Usuario['senha']) => {
  const usuario = usuarios.find((usuarioNoServidor) =>
    [usuarioNoServidor.cpf, usuarioNoServidor.email].includes(emailOuCpf) && senha === usuarioNoServidor.senha
  );
  return usuario;
};

export const mudarDadosUsuario = (novosDados: Usuario) => {
  const index = usuarios.findIndex(usuario => usuario.id === novosDados.id);

  usuarios[index] = novosDados;
}

export const excluirUsuario = (id: Usuario['id']) => {
  const index = usuarios.findIndex(usuario => usuario.id === id);

  usuarios.splice(index, 1);
}