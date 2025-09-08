import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Platform, PixelRatio, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isTablet = width > 600;

// Lista de conteúdos com imagens e categorias
const listaConteudos = [
  {
    id: '1',
    titulo: 'O que é o Alzheimer',
    keywords: 'o que é alzheimer doença',
    tela: 'OqueAlzheimer',
    imagem: require('../assets/ImgAlzheimer.png'),
    categoria: 'Alzheimer',
  },
  {
    id: '2',
    titulo: 'Tratamento',
    keywords: 'tratamento alzheimer',
    tela: 'Tratamento',
    imagem: require('../assets/ImgTratamento.png'),
    categoria: 'Alzheimer',
  },
  {
    id: '3',
    titulo: 'Cuidados Diários',
    keywords: 'cuidados',
    tela: 'CuidadosDiarios',
    imagem: require('../assets/ImgCuidadosDiarios.png'),
    categoria: 'Alzheimer',
  },
  {
    id: '4',
    titulo: 'Alteração de Humor',
    keywords: 'alteracao de humor personalidade',
    tela: 'AlteracaoHumor',
    imagem: require('../assets/ImgAlteracao.png'),
    categoria: 'Alzheimer',
  },
  {
    id: '5',
    titulo: 'Quem é o cuidador?',
    keywords: 'cuidador',
    tela: 'QuemCuidador',
    imagem: require('../assets/imgEstagios.png'), // Corrigido de imgEstagios.png
    categoria: 'Cuidador',
  },
  {
    id: '6',
    titulo: 'Rede de Apoio',
    keywords: 'cuidador',
    tela: 'RedeApoio',
    imagem: require('../assets/ImgRedeApoio.png'),
    categoria: 'Cuidador',
  },
  {
    id: '7',
    titulo: 'Saúde Mental',
    keywords: 'cuidador',
    tela: 'SaudeMental',
    imagem: require('../assets/ImgSaudeMental.png'),
    categoria: 'Cuidador',
  },
  {
    id: '8',
    titulo: 'Direitos do Cuidador',
    keywords: 'direitos cuidador',
    tela: 'DireitosCuidador',
    imagem: require('../assets/ImgDireitosCuidador.png'),
    categoria: 'Cuidador',
  },
  {
    id: '9',
    titulo: 'Dicas',
    keywords: 'dicas',
    tela: 'Dicas',
    imagem: require('../assets/ImgDicas.png'),
    categoria: 'Cuidador',
  },
];

export default function Conteudos() {
  const navigation = useNavigation();
  const [pesquisa, setPesquisa] = useState('');

  // Função para filtrar conteúdos na pesquisa
  const filtrarConteudos = () => {
    if (pesquisa.trim() === '') {
      return listaConteudos;
    }

    const textoPesquisa = pesquisa.toLowerCase();
    const conteudosFiltrados = [];

    for (let i = 0; i < listaConteudos.length; i++) {
      const conteudo = listaConteudos[i];
      const keywords = conteudo.keywords.toLowerCase();

      if (keywords.includes(textoPesquisa)) {
        conteudosFiltrados.push(conteudo);
      }
    }
    return conteudosFiltrados;
  };

  // Filtrar conteúdos por categoria
  const conteudosAlzheimer = listaConteudos.filter((conteudo) => conteudo.categoria === 'Alzheimer');
  const conteudosCuidador = listaConteudos.filter((conteudo) => conteudo.categoria === 'Cuidador');

  const conteudosExibidos = filtrarConteudos();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground}
      >
        <LogoCerebro />
        <Text style={styles.titulo}>Conteúdos</Text>

        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {/* Área de Pesquisa */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={wp('6%')} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              placeholder="Digite sua dúvida aqui ..."
              placeholderTextColor="#9CA3AF"
              value={pesquisa}
              onChangeText={(texto) => setPesquisa(texto)}
              style={styles.searchInput}
            />
          </View>

          {/* Resultados da Pesquisa */}
          <Text style={styles.sectionTitle}>Resultados da Pesquisa</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonContainer}
          >
            {conteudosExibidos.length > 0 ? (
              conteudosExibidos.map((conteudo) => (
                <TouchableOpacity
                  key={conteudo.id}
                  style={styles.button}
                  onPress={() => conteudo.tela ? navigation.navigate(conteudo.tela) : null}
                >
                  <Image
                    source={conteudo.imagem}
                    style={styles.imagem}
                    resizeMode="contain"
                  />
                  <Text style={styles.textoButton}>{conteudo.titulo}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.semResultados}>Nenhum conteúdo encontrado.</Text>
            )}
          </ScrollView>

          {/* Todos os Conteúdos - Alzheimer */}
          <Text style={styles.sectionTitle}>Alzheimer</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonContainer}
          >
            {conteudosAlzheimer.length > 0 ? (
              conteudosAlzheimer.map((conteudo) => (
                <TouchableOpacity
                  key={conteudo.id}
                  style={styles.button}
                  onPress={() => conteudo.tela ? navigation.navigate(conteudo.tela) : null}
                >
                  <Image
                    source={conteudo.imagem}
                    style={styles.imagem}
                    resizeMode="contain"
                  />
                  <Text style={styles.textoButton}>{conteudo.titulo}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.semResultados}>Nenhum conteúdo de Alzheimer disponível.</Text>
            )}
          </ScrollView>

          {/* Todos os Conteúdos - Cuidador */}
          <Text style={styles.sectionTitle}>Cuidador</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonContainer}
          >
            {conteudosCuidador.length > 0 ? (
              conteudosCuidador.map((conteudo) => (
                <TouchableOpacity
                  key={conteudo.id}
                  style={styles.button}
                  onPress={() => conteudo.tela ? navigation.navigate(conteudo.tela) : null}
                >
                  <Image
                    source={conteudo.imagem}
                    style={styles.imagem}
                    resizeMode="contain"
                  />
                  <Text style={styles.textoButton}>{conteudo.titulo}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.semResultados}>Nenhum conteúdo de Cuidador disponível.</Text>
            )}
          </ScrollView>
        </ScrollView>
        <BarraNavegacao />
      </LinearGradient>
    </SafeAreaView>
  );
}

const fontScale = PixelRatio.getFontScale();

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6495ed',
  },
  gradientBackground: {
    flex: 1,
    paddingTop: hp('10%'),
  },
  titulo: {
    color: '#fff',
    textAlign: 'center',
    fontSize: wp('8%') / fontScale,
    marginTop: hp('1%'),
    fontFamily: 'Calistoga_400Regular',
  },
  body: {
    backgroundColor: '#F3F4F6',
    marginTop: hp('6%'),
    paddingBottom: hp('25%'),
    minHeight: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2%'),
  },
  button: {
    backgroundColor: '#693fbb',
    width: isTablet ? wp('25%') : wp('30%'),
    height: hp('18%'),
    marginHorizontal: wp('2%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
        borderWidth: 1,
        borderColor: '#00000010',
      },
    }),
  },
  textoButton: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    fontSize: wp('3.5%') / fontScale,
    textAlign: 'center',
    marginTop: hp('1.5%'),
  },
  imagem: {
    width: isTablet ? wp('23%') : wp('28%'),
    height: hp('10%'),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: wp('4%'),
    paddingHorizontal: wp('4%'),
    height: hp('7%'),
    width: isTablet ? wp('80%') : wp('90%'),
    marginVertical: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'center',
  },
  searchIcon: {
    marginRight: wp('3%'),
  },
  searchInput: {
    flex: 1,
    fontSize: wp('4%') / fontScale,
    color: '#1F2937',
  },
  semResultados: {
    fontSize: wp('4%') / fontScale,
    color: '#4B5563',
    marginTop: hp('2%'),
    textAlign: 'center',
    paddingHorizontal: wp('5%'),
  },
  sectionTitle: {
    fontSize: wp('5%') / fontScale,
    fontFamily: 'Poppins_700Bold',
    color: '#4B5563',
    marginLeft: wp('5%'),
    marginBottom: hp('1%'),
    marginTop: hp('2%'),
  },
});