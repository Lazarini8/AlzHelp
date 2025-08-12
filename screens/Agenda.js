import React, { useState, useRef } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEventos } from '../EventoContext';


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


  const { eventos, setEventos } = useEventos();

  const [modalVisible, setModalVisible] = useState(false);

  // Dados do evento no modal
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState(new Date());
  const [horaInicioDate, setHoraInicioDate] = useState(new Date());
  const [horaFimDate, setHoraFimDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));
  const [dataFinalRepeticao, setDataFinalRepeticao] = useState(null);
  const [cor, setCor] = useState(COLORS[0].value);
  const [repeticao, setRepeticao] = useState('none');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPickerInicio, setShowPickerInicio] = useState(false);
  const [showPickerFim, setShowPickerFim] = useState(false);
  const [showDatePickerFinal, setShowDatePickerFinal] = useState(false);

  const [dataAtual, setDataAtual] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // day, week, month

  // Função para validar horários
  function validarHorarios() {
    const inicio = dayjs(data)
      .hour(horaInicioDate.getHours())
      .minute(horaInicioDate.getMinutes())
      .second(0)
      .millisecond(0);

    let fim = dayjs(data)
      .hour(horaFimDate.getHours())
      .minute(horaFimDate.getMinutes())
      .second(0)
      .millisecond(0);

    if (!fim.isAfter(inicio)) {
      fim = fim.add(1, 'day');
    }

    return fim.diff(inicio, 'minute') >= 1;
  }

  // Cria eventos repetidos
  function criarEventosRepetidos(baseEvento, repeticaoSelecionada) {
    const eventosRepetidos = [];
    let i = 0;
    let novaData = dayjs(baseEvento.start);

    while (true) {
      if (dataFinalRepeticao && novaData.isAfter(dayjs(dataFinalRepeticao))) break;
      if (!dataFinalRepeticao && i > 3650) break; // Limite 10 anos para não travar

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

  // Abrir modal para novo evento
  function abrirModalComDataSelecionada(diaSelecionado) {
    setEventoSelecionado(null);
    setTitulo('');
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

  // Abrir modal para editar evento
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

    setModalVisible(true);
  }

  // Fechar modal e limpar campos
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
  }

  // Adicionar ou editar evento
  function adicionarOuEditarEvento() {
    if (!titulo.trim()) {
      Alert.alert('Preencha o título!');
      return;
    }
    if (!validarHorarios()) {
      Alert.alert('Hora de término deve ser após a hora de início (mínimo 1 minuto).');
      return;
    }

    let novosEventos = [...eventos];

    if (eventoSelecionado) {
      // Remove evento(s) da série se existir serieId, senão só o selecionado
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

    let fim = dayjs(data)
      .hour(horaFimDate.getHours())
      .minute(horaFimDate.getMinutes())
      .second(0)
      .millisecond(0);

    if (!fim.isAfter(inicio)) {
      fim = fim.add(1, 'day');
    }

    const baseId = eventoSelecionado && eventoSelecionado.serieId ? eventoSelecionado.serieId : `${Date.now()}`;

    const novoEventoBase = {
      id: baseId,
      title: titulo,
      start: inicio.toDate(),
      end: fim.toDate(),
      color: cor,
      repeticao,
      dataFinalRepeticao,
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

  // Excluir evento (único ou série)
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
    <View style={{ flex: 1, paddingTop: 40 }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>

          <View style={styles.navContainer}>
            <TouchableOpacity onPress={() => setDataAtual(dayjs(dataAtual).subtract(1, 'month').toDate())}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>{dayjs(dataAtual).format('MMMM YYYY')}</Text>

            <TouchableOpacity onPress={() => setDataAtual(dayjs(dataAtual).add(1, 'month').toDate())}>
              <Ionicons name="chevron-forward" size={28} color="white" />
            </TouchableOpacity>
          </View>
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

      {/* Calendário */}
      <Calendar
        events={eventos}
        height={450}
        mode={viewMode}
        weekStartsOn={1}
        locale="pt-br"
        onPressEvent={aoTocarEvento}
        onPressCell={abrirModalComDataSelecionada}
        eventCellStyle={event => ({ backgroundColor: event.color })}
        onChangeDate={range => {
          if (range && range[0] && !dayjs(range[0]).isSame(dataAtual, 'day')) {
            setDataAtual(range[0]);
          }
        }}
        date={dataAtual}
      />

      {/* Modal do evento */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              <Text style={styles.sectionTitle}>Data do Evento:</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{dayjs(data).format('DD/MM/YYYY')}</Text>
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
                <Text>{`${horaInicioDate.getHours().toString().padStart(2, '0')}:${horaInicioDate.getMinutes().toString().padStart(2, '0')}`}</Text>
              </TouchableOpacity>
              {showPickerInicio && (
                <DateTimePicker
                  mode="time"
                  value={horaInicioDate}
                  is24Hour={true}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowPickerInicio(Platform.OS === 'ios');
                    if (selectedDate) setHoraInicioDate(selectedDate);
                  }}
                />
              )}

              <Text style={styles.sectionTitle}>Hora Fim:</Text>
              <TouchableOpacity onPress={() => setShowPickerFim(true)} style={styles.input}>
                <Text>{`${horaFimDate.getHours().toString().padStart(2, '0')}:${horaFimDate.getMinutes().toString().padStart(2, '0')}`}</Text>
              </TouchableOpacity>
              {showPickerFim && (
                <DateTimePicker
                  mode="time"
                  value={horaFimDate}
                  is24Hour={true}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowPickerFim(Platform.OS === 'ios');
                    if (selectedDate) setHoraFimDate(selectedDate);
                  }}
                />
              )}

              <Text style={styles.sectionTitle}>Data Final da Repetição (Opcional):</Text>
              <TouchableOpacity onPress={() => setShowDatePickerFinal(true)} style={styles.input}>
                <Text>{dataFinalRepeticao ? dayjs(dataFinalRepeticao).format('DD/MM/YYYY') : 'Nenhuma'}</Text>
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

              <TextInput
                placeholder="Título"
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
              />

              <Text style={styles.sectionTitle}>Cor do evento:</Text>
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
                <Text style={[styles.textoBotao, { color: 'black' }]}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#7B68EE',
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#7B68EE',
  },
  backButton: {
    padding: 5,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 12,
    textTransform: 'capitalize',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 5,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  colorCircleSelected: {
    borderWidth: 3,
    borderColor: 'black',
  },
  repeatPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  repeatOption: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 5,
  },
  repeatOptionSelected: {
    backgroundColor: '#6495ED',
  },
  repeatOptionText: {
    color: 'black',
    fontWeight: 'normal',
  },
  repeatOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  botaoExcluir: {
    backgroundColor: '#DC143C',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  botaoCancelar: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 5,
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
  },
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5a4fbf',
    paddingVertical: 8,
  },
  viewModeButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewModeButtonActive: {
    backgroundColor: '#483cbf',
  },
  viewModeText: {
    color: 'white',
    fontWeight: '600',
  },
  viewModeTextActive: {
    fontWeight: 'bold',
  },
});
