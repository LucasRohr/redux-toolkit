import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext, 
  useCallback,
  useContext,
  useState
} from 'react';

interface Usuario {
  nome: string
}

interface UsuarioContextState {
  usuario?: Usuario,
  setUsuario: Dispatch<SetStateAction<Usuario | undefined>>
}

const UsuarioContext = createContext<UsuarioContextState>({
  setUsuario: () => { }
});

export const UsuarioProvider = ({ children }: PropsWithChildren) => {
  const [usuario, setUsuario] = useState<Usuario | undefined>();
  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  )
}

const useUsuario = () => {
  const { usuario, setUsuario } = useContext(UsuarioContext);

  const logar = (novoUsuario: Usuario) => useCallback(() => setUsuario(novoUsuario), []);

  return { usuario, logar };
}

export default useUsuario;