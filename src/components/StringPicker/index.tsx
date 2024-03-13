import { useState } from 'react';
import { Searchbar, SearchbarProps, Dialog, Portal, Text, Button } from 'react-native-paper';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

interface StringPickerProps extends SearchbarProps {
  options: string[]
}

export default function StringPicker({ options, ...props }: StringPickerProps) {
  const [aberto, setAberto] = useState<boolean>(false);

  const esconder = () => setAberto(false);

  const handlePress = (opcao: string) => () => {
    props.onChangeText?.(opcao);
    esconder();
  }

  return (
    <>
      <Searchbar
        {...props}
        onPressIn={(evento) => {
          evento.preventDefault();
          if(props.editable !== false) setAberto(true);
        }}
        showSoftInputOnFocus={false}
      />
      <Portal>
        <Dialog visible={aberto} onDismiss={esconder}>
          <ScrollView  style={styles.dialog}>
            {options.map(opcao => (
              <Button
                key={opcao}
                style={styles.opcao}
                onPress={handlePress(opcao)}
              >
                {opcao}
              </Button>
            ))}
          </ScrollView>
        </Dialog>
      </Portal>
    </>
  )
}