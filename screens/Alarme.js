import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput, StyleSheet, ScrollView, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const fontScale = PixelRatio.getFontScale();

const diasSemana = [
  { nome: 'Dom', valor: 0 },
  { nome: 'Seg', valor: 1 },
  { nome: 'Ter', valor: 2 },
  { nome: 'Qua', valor: 3 },
  { nome: 'Qui', valor: 4 },
  { nome: 'Sex', valor: 5 },
  { nome: 'Sáb', valor: 6 },
];

export default function Alarme() {
  const [horaCompleta, setHoraCompleta] = useState(new Date());
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [nomeAlarme, setNomeAlarme] = useState('');
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [listaAlarmes, setListaAlarmes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const soundRef = useRef(null);
  const navigation = useNavigation();

  async function tocarAlarme(nome) {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Alarme.mp3')
    );
    soundRef.current = sound;
    await sound.playAsync();
    Alert.alert('⏰ Alarme', nome);
  }

  function alternarDia(valor) {
    setDiasSelecionados((dias) =>
      dias.includes(valor)
        ? dias.filter((d) => d !== valor)
        : [...dias, valor]
    );
  }

  function adicionarAlarme() {
    if (diasSelecionados.length === 0) {
      Alert.alert('⚠️ Selecione pelo menos um dia.');
      return;
    }

    const novoAlarme = {
      id: Date.now(),
      nome: nomeAlarme || 'Alarme',
      hora: horaCompleta,
      dias: diasSelecionados,
      ativo: true
    };

    setListaAlarmes([...listaAlarmes, novoAlarme]);
    setNomeAlarme('');
    setDiasSelecionados([]);
    setHoraCompleta(new Date());
    setMostrarFormulario(false);
    Alert.alert('✅ Alarme adicionado!');
  }

  function confirmarRemocao(id) {
    Alert.alert(
      'Excluir Alarme',
      'Tem certeza que deseja excluir este alarme?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => removerAlarme(id) }
      ]
    );
  }

  function removerAlarme(id) {
    setListaAlarmes(listaAlarmes.filter(alarme => alarme.id !== id));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const agora = new Date();
      listaAlarmes.forEach((alarme) => {
        if (
          alarme.ativo &&
          alarme.hora.getHours() === agora.getHours() &&
          alarme.hora.getMinutes() === agora.getMinutes() &&
          agora.getSeconds() === 0 &&
          alarme.dias.includes(agora.getDay())
        ) {
          tocarAlarme(alarme.nome);
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, [listaAlarmes]);

  return (
    <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('Ferramentas');
        }
      }} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#ffffff" />
      </TouchableOpacity>

      {!mostrarFormulario ? (
        <TouchableOpacity style={styles.alarmeBotao} onPress={() => setMostrarFormulario(true)}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins_700Bold', }}>Novo Alarme</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.titulo}>Novo Alarme</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do alarme (ex: Remédio)"
            value={nomeAlarme}
            onChangeText={setNomeAlarme}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Horário:</Text>
          <TouchableOpacity onPress={() => setMostrarPicker(true)} style={styles.timeBox}>
            <Text style={styles.timeText}>
              {horaCompleta.getHours().toString().padStart(2, '0')}:{horaCompleta.getMinutes().toString().padStart(2, '0')}
            </Text>
          </TouchableOpacity>

          {mostrarPicker && (
            <DateTimePicker
              value={horaCompleta}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={(event, selectedDate) => {
                setMostrarPicker(false);
                if (selectedDate) setHoraCompleta(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>Repetir em:</Text>
          <View style={styles.diasContainer}>
            {diasSemana.map((dia) => (
              <TouchableOpacity
                key={dia.valor}
                onPress={() => alternarDia(dia.valor)}
                style={[
                  styles.diaBotao,
                  diasSelecionados.includes(dia.valor) && styles.diaSelecionado
                ]}
              >
                <Text style={{
                  color: diasSelecionados.includes(dia.valor) ? '#fff' : '#444',
                  fontWeight: 'bold'
                }}>
                  {dia.nome[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.botoesContainer}>
            <TouchableOpacity style={styles.botaoSecundario} onPress={() => setMostrarFormulario(false)}>
              <Text style={{ color: '#7B68EE', fontSize: 18, fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoPrincipal} onPress={adicionarAlarme}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Text style={[styles.label, { marginTop: 30 }]}>Alarmes Criados:</Text>
      {listaAlarmes.length === 0 ? (
        <Text style={{ color: '#999', marginTop: 10, fontFamily: 'Poppins_400Regular', }}>Nenhum alarme criado ainda.</Text>
      ) : (
        listaAlarmes.map((alarme) => (
          <View key={alarme.id} style={styles.alarmeItem}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: wp('5.5%'), fontWeight: 'bold' }}>{alarme.nome}</Text>
              <Text>Horário: {alarme.hora.getHours().toString().padStart(2, '0')}:{alarme.hora.getMinutes().toString().padStart(2, '0')}</Text>
              <Text>Dias: {alarme.dias.map(d => diasSemana[d].nome).join(', ')}</Text>
            </View>
            <TouchableOpacity onPress={() => confirmarRemocao(alarme.id)} style={styles.trashButton}>
              <Ionicons name="trash" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F3F4F6',
    paddingTop: hp('6%'),
    paddingBottom: hp('8%'),
    minHeight: hp('100%'),
    alignItems: 'center',
  },
  backButton: {
    padding: wp('2%'),
    marginBottom: hp('2%'),
    alignSelf: 'flex-start',
    marginLeft: wp('5%'),
  },
  titulo: {
    fontSize: wp('7%'),
    fontWeight: '700',
    color: '#7B68EE',
    marginBottom: hp('5%'),
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    fontSize: wp('4%'),
    fontFamily: 'Poppins_400Regular',
    marginBottom: hp('4%'),
    backgroundColor: '#fff',
    width: wp('90%'),
    elevation: 2,
  },
  label: {
    fontSize: wp('4.5%'),
    color: '#555',
    marginBottom: hp('3%'),
    alignSelf: 'flex-start',
    paddingHorizontal: wp('3%'),
    width: wp('90%'),
    fontFamily: 'Poppins_700Bold',
  },
  timeBox: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('4%'),
    alignItems: 'center',
    width: wp('90%'),
    elevation: 2,
  },
  timeText: {
    fontSize: wp('6%'),
    color: '#7B68EE',
    fontWeight: '800',
    fontFamily: 'Poppins_400Regular',
  },
  diasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp('3%'),
    justifyContent: 'center',
    width: wp('90%'),
  },
  diaBotao: {
    backgroundColor: '#eee',
    padding: wp('2.5%'),
    borderRadius: wp('10%'),
    margin: wp('1.5%'),
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  diaSelecionado: {
    backgroundColor: '#7B68EE',
  },
  alarmeBotao: {
    backgroundColor: '#7B68EE',
    borderRadius: wp('3%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    marginTop: hp('1%'),
    alignItems: 'center',
    width: wp('90%'),
    elevation: 3,
  },
  alarmeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp('3%'),
    backgroundColor: '#fff',
    padding: wp('4%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    width: wp('90%'),
  },
  trashButton: {
    padding: wp('2.5%'),
  },
  botoesContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: wp('90%'),
  marginTop: hp('1%'),
  marginBottom: hp('2%'),
},
botaoPrincipal: {
  backgroundColor: '#7B68EE',
  borderRadius: wp('3%'),
  paddingVertical: hp('2%'),
  paddingHorizontal: wp('5%'),
  alignItems: 'center',
  width: wp('43%'),
  elevation: 3,
},
botaoSecundario: {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#7B68EE',
  borderRadius: wp('3%'),
  paddingVertical: hp('2%'),
  paddingHorizontal: wp('5%'),
  alignItems: 'center',
  width: wp('43%'),
  elevation: 2,
},
})