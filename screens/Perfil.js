import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';
import { useProfileImage } from './src/FotoPerfil';

export default function Perfil() {
  const navigation = useNavigation();
  const { profileImage, pickImage } = useProfileImage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground}
      >
        <LogoCerebro />
        <Image
          source={require('../assets/logoBorbRoxoClaro.png')}
          style={styles.borboleta}
        />
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.retangulo}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={profileImage ? { uri: profileImage } : require('../assets/perfil4.png')}
                style={styles.profileIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonEditar}>
              <Text style={styles.buttonTextEditar}>Editar Informações</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.opcoes}>
            <TouchableOpacity style={styles.buttonOpcoes}>
              <Image source={require('../assets/confIcon.png')} style={styles.confIcon} />
              <Text style={styles.buttonText}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOpcoes}>
              <Image source={require('../assets/lembreteIcon.png')} style={styles.lembreteIcon} />
              <Text style={styles.buttonText}>Lembretes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOpcoes}>
              <Image source={require('../assets/privacidadeIcon.png')} style={styles.privacidadeIcon} />
              <Text style={styles.buttonText}>Privacidade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOpcoes}>
              <Image source={require('../assets/ajudaIcon.png')} style={styles.ajudaIcon} />
              <Text style={styles.buttonText}>Ajuda</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOpcoes}
              onPress={() => navigation.navigate('QuemNosSomos')}
            >
              <Image source={require('../assets/nosIcon.png')} style={styles.nosIcon} />
              <Text style={styles.buttonText}>Quem nós somos?</Text>
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
    backgroundColor: '#b4a0e4', // Consistente com Ferramentas.js
    paddingBottom: hp('0%'), // Ajustado de -1% para evitar cortes
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
  borboleta: {
    width: wp('60%'), // Reduzido de 80% para evitar sobreposições
    height: hp('8%'), // Ajustado de 10% para proporção
    resizeMode: 'contain',
    marginTop: hp('2%'), // Reduzido de 10% para melhor espaçamento
    marginBottom: hp('2%'), // Ajustado de 3%
    alignSelf: 'center',
  },
  body: {
    backgroundColor: '#F3F4F6', // Consistente com Ferramentas.js
    marginTop: hp('6%'), // Consistente com Ferramentas.js
    paddingBottom: hp('8%'), // Consistente com Ferramentas.js
    minHeight: '100%',
    alignItems: 'center', // Consistente com Ferramentas.js
  },
  retangulo: {
    width: wp('90%'), // Consistente com Ferramentas.js
    height: hp('15%'), // Ajustado de 18% para proporção
    backgroundColor: '#693fbb', // Consistente com botões de Ferramentas.js
    marginTop: hp('2%'), // Ajustado para espaçamento
    flexDirection: 'row', // Alinhado com Ferramentas.js (AlinhaBottons)
    alignItems: 'center',
    justifyContent: 'space-between', // Distribui imagem e botão
    paddingHorizontal: wp('5%'), // Adicionado para espaçamento interno
    borderRadius: wp('2.8%'), // Consistente com botões de Ferramentas.js
  },
  profileIcon: {
    width: wp('18%'), // Mantido
    height: wp('18%'), // Mantido
    borderRadius: wp('9%'), // Mantido
  },
  buttonEditar: {
    backgroundColor: '#b98bed', // Mantido
    width: wp('50%'), // Mantido
    height: hp('4.5%'), // Mantido
    borderRadius: wp('12.5%'), // Mantido
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextEditar: {
    textAlign: 'center',
    color: '#fff',
    fontSize: wp('3.5%'), // Mantido
    fontFamily: 'Poppins_700Bold', // Consistente com Ferramentas.js
  },
  opcoes: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'), // Mantido
  },
  buttonOpcoes: {
    backgroundColor: '#ffffff', // Corrigido de #ffffffff
    width: wp('90%'), // Ajustado de 80% para consistência com retangulo
    height: hp('7%'), // Mantido
    borderRadius: wp('2.8%'), // Alinhado com botões de Ferramentas.js
    marginBottom: hp('1.5%'), // Mantido
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('3%'), // Ajustado de 2% para melhor espaçamento
  },
  buttonText: {
    color: 'black',
    fontSize: wp('4%'), // Mantido
    fontFamily: 'Poppins_700Bold', // Alinhado com textoButton de Ferramentas.js
    marginLeft: wp('3%'), // Ajustado de 2% para consistência
  },
  confIcon: {
    width: wp('8%'), // Mantido
    height: wp('8%'), // Mantido
  },
  lembreteIcon: {
    width: wp('7.5%'), // Mantido
    height: wp('8%'), // Mantido
  },
  privacidadeIcon: {
    width: wp('8.5%'), // Mantido
    height: wp('8.5%'), // Mantido
  },
  ajudaIcon: {
    width: wp('9%'), // Mantido
    height: wp('9%'), // Mantido
  },
  nosIcon: {
    width: wp('11%'), // Mantido
    height: wp('8%'), // Mantido
  },
});