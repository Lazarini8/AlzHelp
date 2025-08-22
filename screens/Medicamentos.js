import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import bancoRemedios from './src/Remedios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PesquisaRemedio() {
  const navigation = useNavigation();
  const [remedio, setRemedio] = useState('');
  const [info, setInfo] = useState(null);
  const [sugestoes, setSugestoes] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animação para sugestões e resultados

  // Animar entrada de sugestões e resultados
  React.useEffect(() => {
    if (sugestoes.length > 0 || info) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [sugestoes, info]);

  const handleChange = (texto) => {
    setRemedio(texto);
    if (texto && texto.length > 0 && bancoRemedios) {
      const matches = Object.keys(bancoRemedios).filter((key) =>
        key.toLowerCase().startsWith(texto.toLowerCase())
      );
      setSugestoes(matches);
    } else {
      setSugestoes([]);
    }
  };

  const buscarRemedio = (nome) => {
    const nomeParaBuscar = nome || remedio || '';
    if (typeof nomeParaBuscar !== 'string' || nomeParaBuscar.trim() === '') {
      setInfo({ descricao: 'Por favor, digite o nome de um remédio.' });
      return;
    }
    const nomeDigitado = nomeParaBuscar.trim().toLowerCase();
    if (bancoRemedios) {
      const resultado = Object.keys(bancoRemedios).find(
        (key) => key.toLowerCase() === nomeDigitado
      );
      if (resultado) {
        setInfo(bancoRemedios[resultado]);
      } else {
        setInfo({ descricao: 'Remédio não encontrado. Verifique se o nome do remédio está escrito corretamente.' });
      }
    } else {
      setInfo({ descricao: 'Erro: Banco de remédios não carregado.' });
    }
  };

  return (
    <LinearGradient
      colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
      style={styles.gradientBackground}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
             navigation.navigate('Ferramentas');
            }
          }} style={styles.backButton}>

          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Glossário de Remédios</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={24} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              placeholder="Digite o nome do remédio"
              placeholderTextColor="#9CA3AF"
              value={remedio}
              onChangeText={handleChange}
              style={styles.searchInput}
            />
          </View>

          {sugestoes.length > 0 && (
            <Animated.View style={[styles.sugestoesContainer, { opacity: fadeAnim }]}>
              {sugestoes.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setRemedio(item);
                    setSugestoes([]);
                    buscarRemedio(item);
                  }}
                  style={styles.sugestaoItem}
                >
                  <Text style={styles.sugestaoTexto}>{item}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}

          <TouchableOpacity style={styles.botao} onPress={() => buscarRemedio()}>
            <Text style={styles.botaoTexto}>Pesquisar</Text>
          </TouchableOpacity>

        {info && (
  <Animated.View style={[styles.resultado, { opacity: fadeAnim }]}>
    {console.log('Info:', info)}
    <Text style={styles.label}>Descrição:</Text>
    <Text style={styles.texto}>{info.descricao}</Text>

    <Text style={styles.label}>Dosagem:</Text>
    <Text style={styles.texto}>{info.dosagem || 'Não disponível'}</Text>

    <Text style={styles.label}>Efeitos Colaterais:</Text>
    <Text style={styles.texto}>{info.efeitos || 'Não disponível'}</Text>

    {!info.descricao.includes('não encontrado') && !info.descricao.includes('Erro') && (
      <TouchableOpacity
        style={styles.botaoAdc}
        onPress={() => {
          navigation.navigate('Agenda', {
            medicamento: {
              nome: remedio,
              descricao: info.descricao,
              dosagem: info.dosagem,
              efeitos: info.efeitos,
            },
          });
        }}
      >
        <Text style={styles.botaoTexto}>Adicionar ao Calendário</Text>
      </TouchableOpacity>
    )}
  </Animated.View>
)}
            
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
   fontFamily: 'Calistoga_400Regular',
    flex: 1,
    textAlign: 'center',
  },
  body: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6', // Fundo cinza claro
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '100%', // Garante que o body ocupe a tela inteira
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 120,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Efeito glassmorphism
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
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontFamily: 'System',
  },
  sugestoesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    width: '90%',
    maxHeight: 200,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sugestaoItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  sugestaoTexto: {
    fontSize: 16,
    color: '#1F2937',
    fontFamily: 'System',
  },
  botao: {
    backgroundColor: '#693fbb',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    width: '90%',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  botaoAdc: {
    backgroundColor: '#693fbb',
    borderRadius: 16,
    paddingVertical: 11,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  resultado: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 12,
    fontFamily: 'System',
  },
  texto: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4,
    lineHeight: 20,
    fontFamily: 'System',
  },
});