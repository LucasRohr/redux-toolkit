import { Usuario } from "src/types/usuario";

interface UserInitialStateInterface {
  loggedUser: Usuario | undefined;
}

interface LoginUserPayloadInterface {
  emailOrCpf: string;
  password: string;
}

interface LoginUserActionInterface {
  type: string;
  payload: LoginUserPayloadInterface | null;
}

export { UserInitialStateInterface, LoginUserActionInterface };
