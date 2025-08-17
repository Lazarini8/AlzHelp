import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import bancoRemedios from '../src/remedios';

export default function PesquisaRemedio() {
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
    <LinearGradient colors={['#6495ed', '#ba55d3']} style={styles.glossario}>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.titulo}>Glossário de remédios</Text>

      <Text style={styles.bemVindo}>Bem vindo a página do glossário de remédios!{'\n'}</Text>
      <Text style={styles.explica}>   Aqui você poderá pesquisar sobre qualquer remédio que precisar saber as informações. {'\n'}{'\n'}   Esta página permite que você tenha acesso a informações relevantes para a compreenção sobre a necessidade do uso dos medicamentos e quais seus possíveis efeitos colaterais. {'\n'}</Text>
      <Text style={styles.atencao}>   Consulte seu médico antes da ingestão de qualquer remédio que não tenha sido recomendado pelo mesmo!</Text>

      <TextInput
        style={styles.barraPesquisa}
        placeholder="Digite o nome do remédio"
        value={remedio}
        onChangeText={handleChange}
      />

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
  glossario: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  bemVindo: {
    textAlign: 'center',  // centraliza horizontalmente
    fontSize: 19,
    color: '#000',
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
  barraPesquisa: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    marginTop:40,
  },
  botao: {
    backgroundColor: '#b98bed',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sugestoesContainer: {
  backgroundColor: '#fff',
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#ccc',
  maxHeight: 150, // limita a altura
  marginBottom: 10,
  paddingHorizontal: 10,
  marginTop: 0.3,
},
sugestaoTexto: {
  fontSize: 20,
},
  resultado: {
    backgroundColor: '#fff',
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
});
