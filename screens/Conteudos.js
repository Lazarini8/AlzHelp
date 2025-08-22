import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

// Lista de conteúdos com imagens e categorias
const listaConteudos = [
  {
    id: '1',
    titulo: 'O que é o Alzheimer',
    keywords: 'o que é alzheimer doença',
    tela: 'OqueAlzheimer',
    imagem: require('../assets/borboletaBrancaRoxo-Photoroom.png'), // Caminho da imagem
    categoria: 'Alzheimer',
  },
  {
    id: '2',
    titulo: 'Glossário de Remédios',
    keywords: 'remédios ibuprofeno dor inflamação medicamento',
    tela: 'PesquisaRemedio',
    imagem: require('../assets/borboletaBrancaRoxo-Photoroom.png'), // Caminho da imagem
    categoria: 'Alzheimer',
  },
  {
    id: '3',
    titulo: 'Calendário de Eventos',
    keywords: 'calendário eventos agenda lembretes',
    tela: 'Calendario',
    imagem: require('../assets/borboletaBrancaRoxo-Photoroom.png'), // Caminho da imagem
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
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground}
      >
        <LogoCerebro />
        <Text style={styles.titulo}>Conteúdos</Text>

        <ScrollView contentContainerStyle={styles.body}>
          {/* Área de Pesquisa */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="#6B7280" style={styles.searchIcon} />
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
                  onPress={() => navigation.navigate(conteudo.tela)}
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
                  onPress={() => navigation.navigate(conteudo.tela)}
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
                  onPress={() => navigation.navigate(conteudo.tela)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    paddingTop: 80,
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 5,
    fontFamily: 'Calistoga_400Regular',
  },
  body: {
    backgroundColor: '#F3F4F6',
    marginTop: 50,
    paddingBottom: 200,
    minHeight: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#693fbb',
    width: 105,
    height: 120,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoButton: {
    color: '#ffffff',
    fontFamily: 'Poppins_700Bold',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  imagem: {
    width: 200,
    height: 80,
    marginBottom: -10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    width: '90%',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'center',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  semResultados: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B5563',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
  },
});