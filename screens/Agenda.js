import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEventos } from '../EventoContext';
import LogoCerebro from '../componentes/LogoCerebro';

dayjs.locale('pt-br');

const COLORS = [
  { label: 'Azul', value: '#6495ED' },
  { label: 'Verde', value: '#32CD32' },
  { label: 'Vermelho', value: '#DC143C' },
  { label: 'Roxo', value: '#7B68EE' },
  { label: 'Laranja', value: '#FFA500' },
];

const REPEAT_OPTIONS = [
  { label: 'Nunca', value: 'none' },
  { label: 'Diário', value: 'daily' },
  { label: 'Semanal', value: 'weekly' },
  { label: 'Mensal', value: 'monthly' },
];

export default function Calendario() {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventos, setEventos } = useEventos();

  const [modalVisible, setModalVisible] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState(new Date());
  const [horaInicioDate, setHoraInicioDate] = useState(new Date());
  const [horaFimDate, setHoraFimDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));
  const [dataFinalRepeticao, setDataFinalRepeticao] = useState(null);
  const [cor, setCor] = useState(COLORS[0].value);
  const [repeticao, setRepeticao] = useState('none');
  const [medicamento, setMedicamento] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPickerInicio, setShowPickerInicio] = useState(false);
  const [showPickerFim, setShowPickerFim] = useState(false);
  const [showDatePickerFinal, setShowDatePickerFinal] = useState(false);

  const [dataAtual, setDataAtual] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');

  useEffect(() => {
    if (route.params?.medicamento) {
      const { medicamento } = route.params;
      setMedicamento(medicamento);
      setTitulo(medicamento.nome);
      setModalVisible(true);
    }
  }, [route.params]);

  function validarHorarios() {
    const inicio = dayjs(data)
      .hour(horaInicioDate.getHours())
      .minute(horaInicioDate.getMinutes())
      .second(0)
      .millisecond(0);

    const fim = dayjs(data)
      .hour(horaFimDate.getHours())
      .minute(horaFimDate.getMinutes())
      .second(0)
      .millisecond(0);

    if (!fim.isAfter(inicio)) {
      return false; // Evita ajuste automático para o próximo dia
    }

    return fim.diff(inicio, 'minute') >= 1;
  }

  function criarEventosRepetidos(baseEvento, repeticaoSelecionada) {
    const eventosRepetidos = [];
    let i = 0;
    let novaData = dayjs(baseEvento.start);

    while (true) {
      if (dataFinalRepeticao && novaData.isAfter(dayjs(dataFinalRepeticao))) break;
      if (!dataFinalRepeticao && i > 3650) break;

      const duracaoMinutos = dayjs(baseEvento.end).diff(dayjs(baseEvento.start), 'minute');

      eventosRepetidos.push({
        ...baseEvento,
        start: novaData.toDate(),
        end: novaData.add(duracaoMinutos, 'minute').toDate(),
        id: `${baseEvento.id}_${i}`,
        serieId: baseEvento.id,
      });

      if (repeticaoSelecionada === 'daily') novaData = novaData.add(1, 'day');
      else if (repeticaoSelecionada === 'weekly') novaData = novaData.add(1, 'week');
      else if (repeticaoSelecionada === 'monthly') novaData = novaData.add(1, 'month');
      else break;

      i++;
    }

    return eventosRepetidos;
  }

  function abrirModalComDataSelecionada(diaSelecionado) {
    setEventoSelecionado(null);
    setTitulo(medicamento ? medicamento.nome : '');
    setData(dayjs(diaSelecionado).toDate());
    const dInicio = new Date();
    dInicio.setSeconds(0);
    dInicio.setMilliseconds(0);
    setHoraInicioDate(dInicio);

    const dFim = new Date();
    dFim.setHours(dFim.getHours() + 1);
    dFim.setSeconds(0);
    dFim.setMilliseconds(0);
    setHoraFimDate(dFim);

    setCor(COLORS[0].value);
    setRepeticao('none');
    setDataFinalRepeticao(null);
    setModalVisible(true);
  }

  function aoTocarEvento(evento) {
    setEventoSelecionado(evento);
    setTitulo(evento.title);
    setData(dayjs(evento.start).toDate());

    const dInicio = new Date(evento.start);
    dInicio.setSeconds(0);
    dInicio.setMilliseconds(0);
    setHoraInicioDate(dInicio);

    const dFim = new Date(evento.end);
    dFim.setSeconds(0);
    dFim.setMilliseconds(0);
    setHoraFimDate(dFim);

    setCor(evento.color || COLORS[0].value);
    setRepeticao(evento.repeticao || 'none');
    setDataFinalRepeticao(evento.dataFinalRepeticao || null);
    setMedicamento(evento.medicamento || null);

    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
    setEventoSelecionado(null);
    setTitulo('');
    setData(new Date());
    const dInicio = new Date();
    dInicio.setSeconds(0);
    dInicio.setMilliseconds(0);
    setHoraInicioDate(dInicio);
    const dFim = new Date();
    dFim.setHours(dFim.getHours() + 1);
    dFim.setSeconds(0);
    dFim.setMilliseconds(0);
    setHoraFimDate(dFim);
    setCor(COLORS[0].value);
    setRepeticao('none');
    setDataFinalRepeticao(null);
    setMedicamento(null);
  }

  function adicionarOuEditarEvento() {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'Preencha o título!');
      return;
    }
    if (!validarHorarios()) {
      Alert.alert('Erro', 'A hora de término deve ser pelo menos 1 minuto após a hora de início.');
      return;
    }

    let novosEventos = [...eventos];

    if (eventoSelecionado) {
      if (eventoSelecionado.serieId) {
        novosEventos = novosEventos.filter(ev => ev.serieId !== eventoSelecionado.serieId);
      } else {
        novosEventos = novosEventos.filter(ev => ev.id !== eventoSelecionado.id);
      }
    }

    const inicio = dayjs(data)
      .hour(horaInicioDate.getHours())
      .minute(horaInicioDate.getMinutes())
      .second(0)
      .millisecond(0);

    const fim = dayjs(data)
      .hour(horaFimDate.getHours())
      .minute(horaFimDate.getMinutes())
      .second(0)
      .millisecond(0);

    const baseId = eventoSelecionado && eventoSelecionado.serieId ? eventoSelecionado.serieId : `${Date.now()}`;

    const novoEventoBase = {
      id: baseId,
      title: titulo,
      start: inicio.toDate(),
      end: fim.toDate(),
      color: cor,
      repeticao,
      dataFinalRepeticao,
      medicamento,
    };

    if (repeticao !== 'none') {
      const repetidos = criarEventosRepetidos(novoEventoBase, repeticao);
      novosEventos = [...novosEventos, ...repetidos];
    } else {
      const unico = { ...novoEventoBase, id: `${Date.now()}`, serieId: null };
      novosEventos.push(unico);
    }

    setEventos(novosEventos);
    fecharModal();
  }

  function excluirEvento() {
    Alert.alert(
      'Excluir Evento',
      'Tem certeza que deseja excluir este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            if (eventoSelecionado) {
              let novosEventos = [...eventos];
              if (eventoSelecionado.serieId) {
                novosEventos = novosEventos.filter(ev => ev.serieId !== eventoSelecionado.serieId);
              } else {
                novosEventos = novosEventos.filter(ev => ev.id !== eventoSelecionado.id);
              }
              setEventos(novosEventos);
              fecharModal();
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground}
      >
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Ferramentas');
            }
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={wp('7%')} color="white" />
        </TouchableOpacity>
     
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setDataAtual(dayjs(dataAtual).subtract(1, 'month').toDate())}>
              <Ionicons name="chevron-back" size={wp('7%')} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{dayjs(dataAtual).format('MMMM YYYY')}</Text>
            <TouchableOpacity onPress={() => setDataAtual(dayjs(dataAtual).add(1, 'month').toDate())}>
              <Ionicons name="chevron-forward" size={wp('7%')} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.viewModeContainer}>
            {[
              { label: 'Dia', value: 'day' },
              { label: 'Semana', value: 'week' },
              { label: 'Mês', value: 'month' },
            ].map(({ label, value }) => (
              <TouchableOpacity
                key={value}
                style={[styles.viewModeButton, viewMode === value && styles.viewModeButtonActive]}
                onPress={() => setViewMode(value)}
              >
                <Text style={[styles.viewModeText, viewMode === value && styles.viewModeTextActive]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.calendarContainer}>
          <Calendar
            events={eventos}
            height={hp('60%')}
            mode={viewMode}
            weekStartsOn={1}
            locale="pt-br"
            onPressEvent={aoTocarEvento}
            onPressCell={abrirModalComDataSelecionada}
            eventCellStyle={event => ({ backgroundColor: event.color, borderRadius: wp('1%') })}
            onChangeDate={range => {
              if (range && range[0] && !dayjs(range[0]).isSame(dataAtual, 'day')) {
                setDataAtual(range[0]);
              }
            }}
            date={dataAtual}
          />
        </View>
        <Modal visible={modalVisible} animationType="fade" transparent>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {medicamento && (
                  <View style={styles.medicamentoContainer}>
                    <Text style={styles.sectionTitle}>Medicamento:</Text>
                    <Text style={styles.medicamentoTexto}>Nome: {medicamento.nome}</Text>
                    <Text style={styles.medicamentoTexto}>Descrição: {medicamento.descricao}</Text>
                    <Text style={styles.medicamentoTexto}>Dosagem: {medicamento.dosagem || 'Não disponível'}</Text>
                    <Text style={styles.medicamentoTexto}>Efeitos Colaterais: {medicamento.efeitos || 'Não disponível'}</Text>
                  </View>
                )}
                <Text style={styles.sectionTitle}>Data do Evento:</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                  <Text style={styles.inputText}>{dayjs(data).format('DD/MM/YYYY')}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    mode="date"
                    value={data}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(Platform.OS === 'ios');
                      if (selectedDate) setData(selectedDate);
                    }}
                  />
                )}
                <Text style={styles.sectionTitle}>Hora Início:</Text>
                <TouchableOpacity onPress={() => setShowPickerInicio(true)} style={styles.input}>
                  <Text style={styles.inputText}>{`${horaInicioDate.getHours().toString().padStart(2, '0')}:${horaInicioDate.getMinutes().toString().padStart(2, '0')}`}</Text>
                </TouchableOpacity>
                {showPickerInicio && (
                  <DateTimePicker
                    mode="time"
                    value={horaInicioDate}
                    is24Hour
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      setShowPickerInicio(Platform.OS === 'ios');
                      if (selectedDate) setHoraInicioDate(selectedDate);
                    }}
                  />
                )}
                <Text style={styles.sectionTitle}>Hora Fim:</Text>
                <TouchableOpacity onPress={() => setShowPickerFim(true)} style={styles.input}>
                  <Text style={styles.inputText}>{`${horaFimDate.getHours().toString().padStart(2, '0')}:${horaFimDate.getMinutes().toString().padStart(2, '0')}`}</Text>
                </TouchableOpacity>
                {showPickerFim && (
                  <DateTimePicker
                    mode="time"
                    value={horaFimDate}
                    is24Hour
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      setShowPickerFim(Platform.OS === 'ios');
                      if (selectedDate) setHoraFimDate(selectedDate);
                    }}
                  />
                )}
                <Text style={styles.sectionTitle}>Data Final da Repetição (Opcional):</Text>
                <TouchableOpacity onPress={() => setShowDatePickerFinal(true)} style={styles.input}>
                  <Text style={styles.inputText}>{dataFinalRepeticao ? dayjs(dataFinalRepeticao).format('DD/MM/YYYY') : 'Nenhuma'}</Text>
                </TouchableOpacity>
                {showDatePickerFinal && (
                  <DateTimePicker
                    mode="date"
                    value={dataFinalRepeticao || new Date()}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      setShowDatePickerFinal(Platform.OS === 'ios');
                      if (selectedDate) setDataFinalRepeticao(selectedDate);
                      else setDataFinalRepeticao(null);
                    }}
                  />
                )}
                <Text style={styles.sectionTitle}>Título:</Text>
                <TextInput
                  placeholder="Digite o título do evento"
                  style={styles.input}
                  value={titulo}
                  onChangeText={setTitulo}
                  placeholderTextColor="#999"
                />
                <Text style={styles.sectionTitle}>Cor do Evento:</Text>
                <View style={styles.colorPicker}>
                  {COLORS.map(c => (
                    <TouchableOpacity
                      key={c.value}
                      style={[
                        styles.colorCircle,
                        { backgroundColor: c.value },
                        cor === c.value && styles.colorCircleSelected,
                      ]}
                      onPress={() => setCor(c.value)}
                    />
                  ))}
                </View>
                <Text style={styles.sectionTitle}>Repetir:</Text>
                <View style={styles.repeatPicker}>
                  {REPEAT_OPTIONS.map(opt => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[
                        styles.repeatOption,
                        repeticao === opt.value && styles.repeatOptionSelected,
                      ]}
                      onPress={() => setRepeticao(opt.value)}
                    >
                      <Text
                        style={[
                          styles.repeatOptionText,
                          repeticao === opt.value && styles.repeatOptionTextSelected,
                        ]}
                      >
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity onPress={adicionarOuEditarEvento} style={styles.botaoSalvar}>
                  <Text style={styles.textoBotao}>{eventoSelecionado ? 'Salvar Alterações' : 'Adicionar Evento'}</Text>
                </TouchableOpacity>
                {eventoSelecionado && (
                  <TouchableOpacity onPress={excluirEvento} style={styles.botaoExcluir}>
                    <Text style={styles.textoBotao}>Excluir Evento</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={fecharModal} style={styles.botaoCancelar}>
                  <Text style={[styles.textoBotao, { color: '#333' }]}>Cancelar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#b4a0e4',
    paddingBottom: hp('1%'), // Corrigido de hp('-1%')
  },
  gradientBackground: {
    flex: 1,
    paddingTop: hp('3%'), // Reduzido para mover o LogoCerebro mais para cima
  },
  backButton: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('3%'),
    padding: wp('2%'),
    zIndex: 3, // Aumentado para evitar sobreposição
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: hp('-4%'), // Move o LogoCerebro mais para cima
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp('8%'),
    marginTop: hp('2%'), // Espaço após o logo
    fontFamily: 'Calistoga_400Regular',
  },
  headerContainer: {
    backgroundColor: 'transparent',
    paddingBottom: hp('1.5%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('3%'),
  },
  headerTitle: {
    color: 'white',
    fontSize: wp('5.5%'),
    fontFamily: 'Poppins_700Bold',
    marginHorizontal: wp('3%'),
    textTransform: 'capitalize',
  },
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp('1%'),
    backgroundColor: 'rgba(0,0,0,0.1)', // Fundo leve para destaque
  },
  viewModeButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
  },
  viewModeButtonActive: {
    backgroundColor: '#483cbf',
  },
  viewModeText: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: wp('4%'),
  },
  viewModeTextActive: {
    fontFamily: 'Poppins_700Bold',
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: wp('3%'), // Aumentado para visual mais suave
    padding: wp('5%'),
    width: wp('90%'),
    maxHeight: hp('80%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: wp('2%'),
    elevation: 5,
  },
  medicamentoContainer: {
    marginBottom: hp('2%'),
    padding: wp('3%'),
    backgroundColor: '#f9fafb',
    borderRadius: wp('2%'),
  },
  medicamentoTexto: {
    fontSize: wp('3.5%'),
    color: '#4B5563',
    marginTop: hp('0.5%'),
    lineHeight: hp('3%'),
    fontFamily: 'Poppins_400Regular',
  },
  sectionTitle: {
    fontFamily: 'Poppins_700Bold',
    marginBottom: hp('1%'),
    fontSize: wp('4.5%'),
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp('3%'),
    marginBottom: hp('1.5%'),
    borderRadius: wp('2%'),
    backgroundColor: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: wp('4%'),
  },
  inputText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: wp('4%'),
    color: '#333',
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('2%'),
  },
  colorCircle: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
  },
  colorCircleSelected: {
    borderWidth: wp('0.8%'),
    borderColor: '#333',
  },
  repeatPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('2%'),
  },
  repeatOption: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3.5%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
  },
  repeatOptionSelected: {
    backgroundColor: '#6495ED',
    borderColor: '#6495ED',
  },
  repeatOptionText: {
    color: '#333',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins_400Regular',
  },
  repeatOptionTextSelected: {
    color: 'white',
    fontFamily: 'Poppins_700Bold',
  },
  botaoSalvar: {
    backgroundColor: '#32CD32',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    marginBottom: hp('1.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: wp('2%'),
    elevation: 3,
  },
  botaoExcluir: {
    backgroundColor: '#DC143C',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    marginBottom: hp('1.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: wp('2%'),
    elevation: 3,
  },
  botaoCancelar: {
    backgroundColor: '#e5e7eb',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: wp('2%'),
    elevation: 3,
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
    fontSize: wp('4%'),
  },
});