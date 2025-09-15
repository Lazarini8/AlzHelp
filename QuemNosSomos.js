import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoCerebro from './componentes/LogoCerebro';
import BarraNavegacao from './componentes/BarraNavegacao';
import { Ionicons } from '@expo/vector-icons';

export default function QuemNosSomos() {
  const navigation = useNavigation();

  const pessoas = [
    {
      nome: 'Isabel Menezes Fiorini',
      idade: '18 anos',
      usuario: '@mf.bel',
      funcao: 'Desenvolvedora',
      imagem: require('./assets/ImagemBel.jpg'),
      descricao:
        'Esse projeto é muito importante para mim, pois me dá a oportunidade de ajudar pessoas que estão enfrentando a mesma realidade que a minha família enfrentou. Por meio deste aplicativo, quero contribuir para que essa jornada seja mais compreensível, acolhedora e tranquila, oferecendo informações, suporte e ferramentas que facilitem o dia a dia de pacientes, cuidadores e familiares.',
    },
    {
      nome: 'Julia Lazarini',
      idade: '18 anos',
      usuario: '@lazarinii8',
      funcao: 'Desenvolvedora',
      imagem: require('./assets/ImagemJu.jpg'),
      descricao:
        'Este projeto representa meu desejo sincero de ajudar e compreender as pessoas da melhor forma possível. Trabalho para que o aplicativo seja intuitivo, acolhedor e capaz de promover mudanças positivas na vida de quem o utiliza.',
    },
    {
      nome: 'Melissa Ayumi Ikuta',
      idade: '18 anos',
      usuario: '@melissaikuta',
      funcao: 'Desenvolvedora',
      imagem: require('./assets/ImagemMe.jpg'),
      descricao:
        'O Alzhelp para mim está sendo a maior prova de empatia que eu já alcancei, visto que é necessário a todo momento pensar nas necessidades do próximo. Faço ele hoje pensando em poder mudar a vida de pessoas que, assim como todo mundo, merecem uma vida leve e satisfatória.',
    },
  ];

  return (
    
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={wp('7%')} color="white" />
        </TouchableOpacity>
        <LogoCerebro />
        <Image source={require('./assets/logoBorbRoxoClaro.png')} style={styles.borboleta} />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.title1}>Nosso propósito</Text>
          <Text style={styles.label}>
            O Alzhelp é fruto do projeto “Cuidando de Quem Cuida”, criado com o propósito de oferecer suporte real e significativo a quem enfrenta os desafios de cuidar de pessoas com Alzheimer.
            {'\n\n'}
            Nosso objetivo é auxiliar cuidadores a entender a doença, lidar com suas fases e oferecer um cuidado mais digno e humano. Sabemos que a saúde e o bem-estar de quem cuida são fundamentais durante todo esse processo, por isso o Alzhelp também foca no cuidado com o cuidador.
            {'\n\n'}
            Além de informações claras sobre a doença, disponibilizamos ferramentas práticas para tornar a rotina menos desgastante, além de conteúdos voltados à saúde mental e ao autocuidado.
            {'\n\n'}
            Cuidar de alguém exige muito, mas ninguém precisa fazer isso sozinho.
          </Text>
          <Text style={styles.title1}>Quem nós somos</Text>
          {pessoas.map((pessoa, index) => (
            <View key={index} style={styles.card}>
              <Image source={pessoa.imagem} style={styles.perfilImagem} />
              <View style={styles.perfilInfo}>
                <Text style={styles.nome}>{pessoa.nome}</Text>
                <Text style={styles.subInfo}>{pessoa.idade}{'\n'}{pessoa.usuario}{'\n'}{pessoa.funcao}</Text>
              </View>
              <Text style={styles.descricao}>{pessoa.descricao}</Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    paddingTop: hp('10%'), // Convertido de 200px, consistente com outros
  },
  backButton: {
    position: 'absolute',
    top: hp('5%'), // Posiciona no topo
    left: wp('3%'), // Alinhado à esquerda
    padding: wp('2%'),
    zIndex: 2, // Acima de outros elementos
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp('8%'), // Consistente com Ferramentas.js, Mapa.js, Perfil.js
    marginTop: hp('1%'), // Consistente
    fontFamily: 'Calistoga_400Regular',
  },
  borboleta: {
    width: wp('60%'), // Convertido de 280px, ajustado como Perfil.js
    height: hp('8%'), // Convertido de 70px
    resizeMode: 'contain',
    marginTop: hp('2%'), // Ajustado para fluxo natural
    marginBottom: hp('2%'),
    alignSelf: 'center',
  },
  scrollView: {
    width: '100%',
  },
  body: {
    backgroundColor: '#F3F4F6', // Consistente com outros
    marginTop: hp('6%'), // Consistente com Ferramentas.js
    padding: wp('5%'), // Convertido de 20px
    paddingBottom: hp('8%'), // Convertido de 100px, consistente
    width: '100%',
    alignItems: 'center',
  },
  title1: {
    color: '#333',
    fontSize: wp('5.5%'), // Convertido de 20px
    fontFamily: 'Poppins_700Bold', // Alinhado com nome em card
    marginBottom: hp('2%'), // Convertido de 10px
  },
  label: {
    color: '#555',
    fontSize: wp('4%'), // Convertido de 14px
    lineHeight: hp('3%'), // Convertido de 20px
    marginBottom: hp('3%'), // Convertido de 20px
    fontFamily: 'Poppins_400Regular',
    textAlign: 'justify',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('4%'), // Convertido de 15px
    padding: wp('4%'), // Convertido de 15px
    marginBottom: hp('2.5%'), // Convertido de 20px
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.3%') }, // Convertido de 2px
    shadowOpacity: 0.2,
    shadowRadius: wp('1%'), // Convertido de 4px
    elevation: 3,
    width: wp('90%'), // Responsivo
  },
  perfilImagem: {
    width: wp('25%'), // Convertido de 100px
    height: wp('25%'), // Convertido de 100px
    borderRadius: wp('12.5%'), // Convertido de 50px
    marginBottom: hp('1.5%'), // Convertido de 10px
    alignSelf: 'center',
  },
  perfilInfo: {
    alignItems: 'center',
    marginBottom: hp('1.5%'), // Convertido de 10px
  },
  nome: {
    fontSize: wp('4%'), // Convertido de 14px
    fontFamily: 'Poppins_700Bold',
    color: '#222',
  },
  subInfo: {
    fontSize: wp('3.5%'), // Convertido de 12px
    color: '#777',
    textAlign: 'center',
    marginTop: hp('0.5%'), // Convertido de 4px
    fontFamily: 'Poppins_400Regular',
  },
  descricao: {
    fontSize: wp('3.5%'), // Convertido de 12px
    color: '#444',
    lineHeight: hp('3%'), // Convertido de 20px
    textAlign: 'justify',
    fontFamily: 'Poppins_400Regular',
  },
});