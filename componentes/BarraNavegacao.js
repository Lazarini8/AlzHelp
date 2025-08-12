// componentes/BarraNavegacao.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BarraNavegacao() {
  const navigation = useNavigation();

  return (
    <View style={styles.footerBar}>
    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
      <Image source={require('../assets/homeIcon.png')} style={styles.homeIcon} />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Conteudos')} style={styles.conteudosButton}>
      <Image source={require('../assets/borboletaAmarelaRoxo.png')} style={styles.conteudosIcon} />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Ferramentas')} style={styles.calendarioButton}>
      <Image source={require('../assets/calendario-icon2.png')} style={styles.calendarioIcon} />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Mapa')} style={styles.mapaButton}>
      <Image source={require('../assets/mapa3.png')} style={styles.mapaIcon} />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.profileButton}>
      <Image source={require('../assets/perfil2.png')} style={styles.profileIcon} />
    </TouchableOpacity>
  </View>

  );
}

const styles = StyleSheet.create({
footerBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#b4a0e4',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profileButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  profileIcon: {
    width: 75,
    height: 50,
    resizeMode: 'contain',
  },
  mapaButton: {
    width: 60,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  mapaIcon: {
    width: 110,
    height: 60,
    resizeMode: 'contain',
  },
  calendarioButton: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  calendarioIcon: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
  },
  conteudosButton: {
    width: 68,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  conteudosIcon: {
    width: 48,
    height: 50,
    resizeMode: 'contain',
  },
  homeButton: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  homeIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },


});
