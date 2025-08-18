import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {bancoRemedios} from './src/Remedios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function PesquisaRemedio() {
  const navigation = useNavigation();
  const [remedio, setRemedio] = useState('');
  const [info, setInfo] = useState(null);
  const [sugestoes, setSugestoes] = useState([]);

  // Atualiza sugestões enquanto digita
  const handleChange = (texto) => {
    setRemedio(texto);
    if (texto.length > 0) {
      const matches = Object.keys(bancoRemedios).filter((key) =>
        key.toLowerCase().startsWith(texto.toLowerCase())
      );
      setSugestoes(matches);
    } else {
      setSugestoes([]);
    }
  };

  const buscarRemedio = (nome) => {
  // Normaliza para minúsculas
  const nomeDigitado = (nome || remedio).trim().toLowerCase();

  // Procura no banco de remédios independentemente de maiúsculas/minúsculas
  const resultado = Object.keys(bancoRemedios).find(
    (key) => key.toLowerCase() === nomeDigitado
  );

  if (resultado) {
    setInfo(bancoRemedios[resultado]);
  } else {
    setInfo({ descricao: 'Remédio não encontrado. Verifique se o nome do remédio está escrito corretamente'});
  }
};

  return (
    <LinearGradient colors={['#6495ed', '#ba55d3']} style={styles. gradientBackground}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#ffffffff" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Glossário de Remédios</Text>
        </View>
         
       <ScrollView contentContainerStyle={styles.body}>

      

      <Text style={styles.bemVindo}>Bem vindo a página do glossário de remédios!{'\n'}</Text>
      <Text style={styles.explica}>   Aqui você poderá pesquisar sobre qualquer remédio que precisar saber as informações. {'\n'}{'\n'}   Esta página permite que você tenha acesso a informações relevantes para a compreenção sobre a necessidade do uso dos medicamentos e quais seus possíveis efeitos colaterais. {'\n'}</Text>
      <Text style={styles.atencao}>   Consulte seu médico antes da ingestão de qualquer remédio que não tenha sido recomendado pelo mesmo!</Text>

     <View style={styles.searchContainer}>
      <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        placeholder="Digite o nome do remédio"
        value={remedio}
        onChangeText={handleChange}/>
      </View>

      {sugestoes.length > 0 && (
        <View style={styles.sugestoesContainer}>
          {sugestoes.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setRemedio(item);
                setSugestoes([]);
                buscarRemedio(item);
              }}
            >
              <Text style={styles.sugestaoTexto}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

              

      <TouchableOpacity style={styles.botao} onPress={buscarRemedio}>
        <Text style={styles.botaoTexto}>Pesquisar</Text>
      </TouchableOpacity>
      

      {info && (
        <ScrollView style={styles.resultado}>
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.texto}>{info.descricao}</Text>

          <Text style={styles.label}>Dosagem:</Text>
          <Text style={styles.texto}>{info.dosagem}</Text>

          <Text style={styles.label}>Efeitos Colaterais:</Text>
          <Text style={styles.texto}>{info.efeitos}</Text>
        </ScrollView>
      )}
      </ScrollView>
       
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
   
  body: {
  backgroundColor: '#ffffffff',
  paddingBottom: 100,
  width: '100%',
  alignItems: 'flex-start',
  flexGrow: 1, // faz com que o conteúdo tente ocupar a altura total da tela
},
  gradientBackground: { // Renomeado de container
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  
  },
   backButton: {
    padding: 5,
    marginTop: 5,
    marginBottom:40,
  },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'Calistoga_400Regular',
    marginBottom: 30,
  },
  bemVindo: {
   color: 'black',
   fontSize: 15,
   marginTop: 10,
   marginLeft: 15,
   marginRight: 15,
   fontFamily: 'Poppins_700Bold',
  },
  explica: {
    fontSize: 16,
    textAlign: 'center',
  },

  atencao: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'orange',
  },

  botao: {
    backgroundColor: '#b98bed',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoTexto: {
    color: '#e92020ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sugestoesContainer: {
  backgroundColor: '#e01616ff',
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#e00f0fff',
  maxHeight: 150, // limita a altura
  marginBottom: 10,
  paddingHorizontal: 10,
  marginTop: 0.3,
},
sugestaoTexto: {
  fontSize: 20,
},
  resultado: {
    backgroundColor: '#f31212ff',
    borderRadius: 10,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  texto: {
    fontSize: 14,
    marginTop: 7,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 2,
    marginBottom: 18,
    marginTop: -20,
   
  },
});
