import { Dispatch, PropsWithChildren, SetStateAction, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Snackbar, SnackbarProps } from 'react-native-paper';
import styles from './styles';

type TiposSnackbar = 'success' | 'error' | 'info' | 'warning';

interface SnackbarContextProps {
  setVisivel: Dispatch<SetStateAction<SnackbarProps['visible']>>,
  setMensagem: Dispatch<SetStateAction<string>>,
  setAction: Dispatch<SetStateAction<SnackbarProps['action']>>,
  setTipoSnackbar: Dispatch<SetStateAction<TiposSnackbar>>,
}

const SnackbarContext = createContext<SnackbarContextProps>({
  setVisivel: () => { },
  setMensagem: () => { },
  setAction: () => { },
  setTipoSnackbar: () => { }
});

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [visivel, setVisivel] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>('');
  const [action, setAction] = useState<SnackbarProps['action']>({ label: '' });
  const [tipoSnackbar, setTipoSnackbar] = useState<TiposSnackbar>('info');

  const onDismiss = useCallback(() => setVisivel(false), [setVisivel]);

  return (
    <SnackbarContext.Provider value={{ setVisivel, setMensagem, setAction, setTipoSnackbar }}>
      <View
        style={{
          position: 'absolute',
          height: 0,
          width: Dimensions.get('screen').width,
          bottom: 0,
          zIndex: 2
        }}
      >
        <Snackbar
          visible={visivel}
          onDismiss={onDismiss}
          action={action}
          theme={{ colors: { inversePrimary: 'white' }}}
          style={[{ position: 'absolute', bottom: 0 }, styles[tipoSnackbar]]}
        >
          {mensagem}
        </Snackbar>
      </View>
      {children}
    </SnackbarContext.Provider>
  )
}

const useSnackbar = () => {
  const { setVisivel, setMensagem, setAction, setTipoSnackbar } = useContext(SnackbarContext);

  const createMessage = (newMessage: string, action?: SnackbarProps['action']) => {
    setVisivel(true);
    setMensagem(newMessage);
    setAction(action || { label: 'Fechar', onPress: () => setVisivel(false) });
  }

  const criarMensagem = useMemo(() => ({
    sucesso: (newMessage: string, action?: SnackbarProps['action']) =>  {
      setTipoSnackbar('success');
      createMessage(newMessage, action);
    },
    erro: (newMessage: string, action?: SnackbarProps['action']) =>  {
      setTipoSnackbar('error');
      createMessage(newMessage, action);
    },
    info: (newMessage: string, action?: SnackbarProps['action']) =>  {
      setTipoSnackbar('info');
      createMessage(newMessage, action);
    },
    warning: (newMessage: string, action?: SnackbarProps['action']) =>  {
      setTipoSnackbar('warning');
      createMessage(newMessage, action);
    }
  }), []);

  return { criarMensagem };
}

export default useSnackbar;