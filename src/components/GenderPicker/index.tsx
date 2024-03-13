import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from './styles';
import { Dispatch, SetStateAction } from 'react';
import { Genero } from 'src/types/usuario';

interface GenderPickerProps {
  value: string | undefined,
  onChange: Dispatch<SetStateAction<Genero | undefined>>,
}

const generos: Genero[] = ['Feminino', 'Masculino', 'Outro'];

export default function GenderPicker({ value, onChange }: GenderPickerProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.tipo}> Gênero </Text>
        <View style={styles.content}>
          {generos.map(genero => (
            <View style={styles.checkboxContainer} key={genero}>
              <Checkbox
                status={value === genero ? 'checked' : 'unchecked'}
                onPress={() => onChange(genero)}
              />
              <Text> {genero} </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}