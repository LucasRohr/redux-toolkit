import { Usuario } from "src/types/usuario";

interface UserInitialStateInterface {
  loggedUser: Usuario | undefined;
  users: Usuario[];
}

interface LoginUserPayloadInterface {
  emailOrCpf: Usuario["email"] | Usuario["cpf"];
  password: Usuario["senha"];
}

export { UserInitialStateInterface, LoginUserPayloadInterface };
