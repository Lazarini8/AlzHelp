// AgendaWidget.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';

export default function AgendaWidget({ eventos }) {
  const navigation = useNavigation();

  // Filtra os eventos do dia atual
  const eventosHoje = eventos.filter(ev => dayjs(ev.start).isSame(dayjs(), 'day'));

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <Text style={styles.widgetTitle}>Eventos de Hoje</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Agenda')}>
          <Text style={styles.verMais}>Ver Agenda</Text>
        </TouchableOpacity>
      </View>

      {eventosHoje.length === 0 ? (
        <Text style={styles.semEventos}>Nenhum evento para hoje</Text>
      ) : (
        <FlatList
          data={eventosHoje}
          keyExtractor={item => item.id.toString()}
          nestedScrollEnabled={true} // Permite lista dentro do ScrollView
          scrollEnabled={false} // Desativa o scroll da FlatList
          renderItem={({ item }) => (
            <View style={styles.eventoItem}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>
                {dayjs(item.start).format('HH:mm')} - {dayjs(item.end).format('HH:mm')}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  widgetContainer: {
    backgroundColor: '#dabaf8ff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
    alignSelf: 'center',
    width: 325,
    minHeight: 160,
    marginTop: 25,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  verMais: {
    right: -15,
    color: '#693fbb',
    fontWeight: 'bold',
  },
  semEventos: {
    fontStyle: 'italic',
    color: '#555',
  },
  eventoItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
