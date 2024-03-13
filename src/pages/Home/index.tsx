import { startTransition, useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button, Card, Modal, Portal, Title, TouchableRipple } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Icon from '@expo/vector-icons/Ionicons';
import DatePicker from 'src/components/DatePicker';

import { TipoViagem, Viagem } from 'src/types/viagem';

import { carregarDestinos, carregarOrigens, getViagens } from 'src/services/viagens';
import { filtrarViagens, filtrosEstaoVazios } from './utils/filtros';

import banner from 'assets/home/banner.png';
import loading from 'assets/loading.png';

import { Filtros } from './types';
import StringPicker from 'src/components/StringPicker';
import useSnackbar from 'src/contexts/Snackbar';

import styles from './styles';
import { valoresPadrao } from './consts';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootStackParamList } from 'src/routes';

export default function Home(props: DrawerScreenProps<RootStackParamList, "Home">) {
  const totalPaginasRef = useRef<number>(1);
  const todasAsViagens = useRef<Viagem[]>([]);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [origens, setOrigens] = useState<string[]>([]);
  const [destinos, setDestinos] = useState<string[]>([]);
  const [tipo, setTipo] = useState<Filtros['tipo']>(valoresPadrao.tipo);
  const [pessoas, setPessoas] = useState<Filtros['pessoas']>(valoresPadrao.pessoas);
  const [origem, setOrigem] = useState<Filtros['origem']>(valoresPadrao.origem);
  const [destino, setDestino] = useState<Filtros['destino']>(valoresPadrao.destino);
  const [dataIda, setDataIda] = useState<Filtros['dataIda']>(valoresPadrao.dataIda);
  const [dataVolta, setDataVolta] = useState<Filtros['dataVolta']>(valoresPadrao.dataVolta);
  const [buscando, setBuscando] = useState<boolean>(false);
  const [filtrarPorUsuario, setFiltrarPorUsuario] = useState<Filtros['filtrarPorUsuario']>(valoresPadrao.filtrarPorUsuario);
  const { criarMensagem } = useSnackbar();
  const usuarioLogado = useSelector((state: RootState) => state.usuario.usuarioLogado);
  const { cidade = '', estado = '' } = usuarioLogado || {};
  const filtros: Filtros = {
    pessoas, tipo, origem, destino, filtrarPorUsuario, dataIda, dataVolta
  };
  const mostrarTodasAsViagens = filtrarPorUsuario === 'todas';
  const mostrarViagensPorCidade = filtrarPorUsuario === 'cidade';
  const mostrarViagensPorEstado = filtrarPorUsuario === 'estado';
  const ehUltimaPagina = paginaAtual === totalPaginasRef.current;

  const trocarOrigemDestino = () => {
    const tmp = origem;
    setOrigem(destino);
    setDestino(tmp);
  }

  const trocarTipo =
    (novoTipo: TipoViagem) =>
      () => setTipo(tipoAtual =>
        novoTipo === tipoAtual ? undefined : novoTipo
      );

  const carregarMais = async () => {
    setBuscando(true);
    const { novasViagens, pagina } = await getViagens(paginaAtual + 1);
    todasAsViagens.current = [...todasAsViagens.current, ...novasViagens];
    startTransition(() => {
      setPaginaAtual(pagina);
      setViagens(viagensAtuais => [...viagensAtuais, ...novasViagens]);
    })
    setBuscando(false);
  }

  const carregarDados = async () => {
    const [viagensData, novasOrigens, novosDestinos] = await Promise.all([
      getViagens(),
      carregarOrigens(),
      carregarDestinos(),
    ]);
    const { pagina, totalPaginas, novasViagens } = viagensData;
    totalPaginasRef.current = totalPaginas;
    todasAsViagens.current = novasViagens;
    startTransition(() => {
      setPaginaAtual(pagina);
      setViagens(novasViagens);
      setOrigens(novasOrigens);
      setDestinos(novosDestinos);
    })
  }

  const handleFiltrarPorUsuario = (
    novoFiltroPorUsuario: Filtros['filtrarPorUsuario']
  ) => () => {
    const novaOrigem = novoFiltroPorUsuario === 'cidade' ? cidade : estado;
    const deveFiltrarPorUsuario = mostrarTodasAsViagens || novaOrigem !== origem;
    setFiltrarPorUsuario(deveFiltrarPorUsuario ? novoFiltroPorUsuario : 'todas');
    setOrigem(deveFiltrarPorUsuario ? novaOrigem : '');
  }

  const handleResetar = () =>
    startTransition(() => {
      setTipo(valoresPadrao.tipo);
      setPessoas(valoresPadrao.pessoas);
      setOrigem(valoresPadrao.origem);
      setDestino(valoresPadrao.destino);
      setDataIda(valoresPadrao.dataIda);
      setDataVolta(valoresPadrao.dataVolta);
      setFiltrarPorUsuario(valoresPadrao.filtrarPorUsuario);
    });

  useEffect(() => void carregarDados(), []);

  const handleBuscar = async () => {
    setBuscando(true);
    let novasViagens = [];
    const filtrosVazios = filtrosEstaoVazios(filtros);
    if (filtrosVazios) novasViagens = todasAsViagens.current;
    else novasViagens = await filtrarViagens(todasAsViagens.current, filtros, cidade, estado);
    setViagens(novasViagens);
    if (!novasViagens.length) return criarMensagem.erro('nenhuma viagem encontrada');
    if (!filtrosVazios) criarMensagem.sucesso(`${novasViagens.length} viagens encontradas`);
    setBuscando(false);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={banner} style={styles.bannerImage} />
        </View>
        <View style={styles.content}>
          <Card style={styles.passagensContent}>
            <Title style={styles.passagensTitulo}> Passagens </Title>
            <View style={styles.tipoContainer}>
              <Button
                icon={tipo === TipoViagem.idaEVolta ? 'check' : 'blank'}
                style={[styles.tipoIda, tipo === TipoViagem.idaEVolta && styles.tipoSelecionado]}
                onPress={trocarTipo(TipoViagem.idaEVolta)}
              >
                Ida e volta
              </Button>
              <Button
                icon={tipo === TipoViagem.ida ? 'check' : 'blank'}
                style={[styles.tipoIdaEVolta, tipo === TipoViagem.ida && styles.tipoSelecionado]}
                onPress={trocarTipo(TipoViagem.ida)}
              >
                Somente ida
              </Button>
            </View>
            <View style={styles.pessoasPicker}>
              <Picker selectedValue={pessoas} onValueChange={setPessoas}>
                <Picker.Item label="1 adulto" value={1} />
                <Picker.Item label="2 adultos" value={2} />
                <Picker.Item label="3 adultos" value={3} />
              </Picker>
            </View>
            <View style={styles.origemContainer}>
              <StringPicker
                value={origem}
                placeholder='Origem'
                editable={mostrarTodasAsViagens}
                selectTextOnFocus={mostrarTodasAsViagens}
                onChangeText={setOrigem}
                icon='airplane-takeoff'
                style={[styles.origem, !mostrarTodasAsViagens && styles.inputDisabled]}
                options={origens}
              />
              <TouchableRipple style={styles.trocar} onPress={trocarOrigemDestino}>
                <Icon name='swap-vertical' size={20} color='white' />
              </TouchableRipple>
              <StringPicker
                value={destino}
                placeholder='Destino'
                onChangeText={setDestino}
                icon='airplane-landing'
                style={styles.destino}
                options={destinos}
              />
            </View>
            <View style={styles.datas}>
              <DatePicker label='Data de ida' value={dataIda} onChangeText={setDataIda} />
              <DatePicker label='Data de volta' value={dataVolta} onChangeText={setDataVolta} />
            </View>
            {usuarioLogado?.cidade && (
              <Button
                mode='contained'
                style={styles.viagemPor}
                textColor='black'
                onPress={handleFiltrarPorUsuario('cidade')}
                icon={mostrarViagensPorCidade ? 'check' : ''}
              >
                Viagens na minha cidade
              </Button>
            )}
            {usuarioLogado?.estado && (
              <Button
                mode='contained'
                style={styles.viagemPor}
                textColor='black'
                onPress={handleFiltrarPorUsuario('estado')}
                icon={mostrarViagensPorEstado ? 'check' : ''}
              >
                Viagens no meu estado
              </Button>
            )}
            <View style={styles.buscarContainer}>
              <Button mode='contained' style={styles.botaoResetarBusca} onPress={handleResetar}>
                Resetar busca
              </Button>
              <Button mode='contained' style={styles.botaoBuscar} onPress={handleBuscar}>
                Buscar
              </Button>
            </View>
          </Card>
          <Title style={styles.viagensTitulo}> Promoções </Title>
          <View style={styles.viagens}>
            {viagens.map((viagem, index) => (
              <Card key={index} style={styles.viagemContainer}>
                <Image source={viagem.foto} style={styles.viagemImagem} />
                <View style={styles.viagemDescricao}>
                  <Title style={styles.viagemTitulo}>{viagem.titulo}</Title>
                  <View style={styles.viagemDetalhes}>
                    <Text><Text style={styles.detalheTitulo}>Data de ida: </Text> {viagem.dataIda} </Text>
                    <Text><Text style={styles.detalheTitulo}>Data de volta: </Text>{viagem.dataVolta} </Text>
                    <Text><Text style={styles.detalheTitulo}>Origem: </Text> {viagem.origem} </Text>
                    <Text><Text style={styles.detalheTitulo}>Destino: </Text> {viagem.destino} </Text>
                    <Text><Text style={styles.detalheTitulo}>Tipo: </Text> {viagem.tipo === TipoViagem.ida ? 'ida' : 'ida e volta'} </Text>
                  </View>
                  <View style={styles.viagemValorContainer}>
                    <Text style={styles.viagemValor}>
                      R$ {
                        (viagem.valor * (tipo === TipoViagem.idaEVolta ? 2 : 1) * pessoas)
                          .toFixed(2)
                          .replace('.', ',')
                      }
                    </Text>
                  </View>
                </View>
                <Button mode='contained' style={styles.verDetalhes}> Ver detalhes </Button>
              </Card>
            ))}
            {!ehUltimaPagina && (
              <Button onPress={carregarMais}>
                <Text style={{ fontSize: 25 }}>
                  Ver mais
                </Text>
              </Button>
            )}
          </View>
        </View>
        <Portal>
          <Modal visible={buscando}>
            <View style={styles.buscandoContainer}>
              <Text style={styles.buscandoText}>
                Aguarde uns instantes, estamos viajando o mundo das milhas para encontrar a melhor solução pra você!
              </Text>
              <Image source={loading} />
            </View>
          </Modal>
        </Portal>

      </ScrollView>
    </SafeAreaView>
  )
}
