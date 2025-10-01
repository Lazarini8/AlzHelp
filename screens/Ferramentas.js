import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AgendaWidget from '../componentes/AgendaWidget';
import { useEventos } from '../EventoContext';
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';
import Medicamentos from './Medicamentos';
import Alarme from './Alarme';

export default function Ferramentas() {
  const navigation = useNavigation();
  const { eventos, notaDestaque } = useEventos();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground}
      >
        <LogoCerebro />
        <Text style={styles.titulo}>Ferramentas</Text>

        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: hp('4%'), paddingBottom: hp('2%'), width: '100%' }}>
            <AgendaWidget eventos={eventos} />
          </View>

          <View style={styles.AlinhaBottons}>
            <TouchableOpacity style={styles.buttonAlarme} onPress={() => navigation.navigate('Alarme')}>
              <Image source={require('../assets/relogio.png')} style={styles.relogioIcon} />
              <Text style={styles.textoButton}>Relógio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonGestaoMed} onPress={() => navigation.navigate('Medicamentos')}>
              <Image source={require('../assets/remedio.png')} style={styles.remedioIcon} />
              <Text style={styles.textoButton}>Medicamentos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBlocoN} onPress={() => navigation.navigate('BlocoNotas')}>
              <Image source={require('../assets/blocoNotas.png')} style={styles.blocoNotasIcon} />
              <Text style={styles.textoButton}>Bloco de Notas</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BarraNavegacao />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 safeArea: {
    flex: 1,
    backgroundColor: '#b4a0e4', // Cor de fundo para combinar com o gradiente
    paddingBottom: hp('-1%'), // Reduzido para minimizar a área segura
  },
  gradientBackground: {
    flex: 1,
    paddingTop: hp('10%'), // Convertido de 80px para responsividade
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp('8%'), // Ajustado de 30 para responsividade
    marginTop: hp('1%'),
    fontFamily: 'Calistoga_400Regular',
  },
  body: {
    backgroundColor: '#F3F4F6',
    marginTop: hp('6%'), // Convertido de 50px
    paddingBottom: hp('8%'), // Reduzido de 200px para responsividade
    minHeight: '100%',
  },
  AlinhaBottons: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    right: wp('0.5%'), // Convertido de 2px
    marginTop: hp('2%'),
  },
  textoButton: {
    color: 'black',
    fontFamily: 'Poppins_700Bold',
    fontSize: wp('2.8%'), // Convertido de 10px
  },
  buttonBlocoN: {
    backgroundColor: '#693fbb',
    margin: wp('2%'), // Convertido de 10px
    width: wp('29%'), // Convertido de 105px
    height: hp('15%'), // Convertido de 120px
    borderRadius: wp('2.8%'), // Convertido de 10px
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonGestaoMed: {
    backgroundColor: '#693fbb',
    width: wp('29%'),
    height: hp('15%'),
    borderRadius: wp('2.8%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonAlarme: {
    backgroundColor: '#693fbb',
    width: wp('29%'),
    height: hp('15%'),
    margin: wp('2%'),
    borderRadius: wp('2.8%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  relogioIcon: {
    width: wp('27%'), // Convertido de 100px
    height: hp('12.5%'), // Convertido de 100px
    resizeMode: 'contain',
    marginTop: hp('1%'), // Convertido de 8px
    marginBottom: hp('1.25%'), // Convertido de 10px
  },
  remedioIcon: {
    width: wp('27%'),
    height: hp('12.5%'),
    resizeMode: 'contain',
    marginTop: hp('1%'),
    marginBottom: hp('1.25%'),
  },
  blocoNotasIcon: {
    width: wp('25%'), // Convertido de 90px
    height: hp('11.9%'), // Convertido de 95px
    resizeMode: 'contain',
    marginTop: hp('1%'),
    marginBottom: hp('1.9%'), // Convertido de 15px
  },
});