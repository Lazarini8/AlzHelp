import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';

export default function Mapa() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground}
      >
        <LogoCerebro />
        <Text style={styles.titulo}>Mapa</Text>
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {/* Conteúdo do ScrollView pode ser adicionado aqui */}
        </ScrollView>
        <BarraNavegacao />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#b4a0e4', // Consistente com Ferramentas.js
    paddingBottom: hp('-1%'), // Área de segurança reduzida, como em Ferramentas.js
  },
  gradientBackground: {
    flex: 1,
    paddingTop: hp('10%'), // Consistente com Ferramentas.js
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp('8%'), // Consistente com Ferramentas.js
    marginTop: hp('1%'), // Consistente com Ferramentas.js
    fontFamily: 'Calistoga_400Regular',
  },
  body: {
    backgroundColor: '#F3F4F6', // Consistente com Ferramentas.js
    marginTop: hp('6%'), // Consistente com Ferramentas.js
    paddingBottom: hp('8%'), // Consistente com Ferramentas.js
    minHeight: '100%',
    alignItems: 'center', // Consistente com Ferramentas.js
  },
});