import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TextInput, TextInputProps } from 'react-native-paper';
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import theme from 'src/config/theme';

export default function DatePicker({ ...textInputProps }: TextInputProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [aberto, setAberto] = useState(false);

  const onChange = (_: DateTimePickerEvent, dataSelecionada?: Date) => {
    setAberto(false);
    if (dataSelecionada) {
      textInputProps?.onChangeText?.(dataSelecionada.toLocaleDateString?.('pt-BR'));
      setDate(dataSelecionada);
    }
  }

  return (
    <>
      <TextInput
        right={<TextInput.Icon icon='calendar' onPress={() => setAberto(!aberto)} />}
        mode='outlined'
        dense
        value={date?.toLocaleDateString('pt-BR')}
        showSoftInputOnFocus={false}
        placeholder='mm/dd/yyyy'
        outlineColor={theme.colors.primary}
        onPressIn={(evento: NativeSyntheticEvent<NativeTouchEvent>) => {
          evento.preventDefault();
          setAberto(true);
        }}
        {...textInputProps}
      />
      {aberto && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? new Date(date) : new Date()}
          mode='date'
          is24Hour={true}
          onChange={onChange}
          accentColor='red'
          textColor='red'
        />
      )}
    </>
  )
}