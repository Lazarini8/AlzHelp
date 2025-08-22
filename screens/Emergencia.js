import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';

export default function Emergencia() {
  const navigation = useNavigation();

  const handleEmergencyCall = async () => {
    const phoneNumber = '192'; 
    const url = Platform.OS === 'ios' ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'Este dispositivo não suporta chamadas telefônicas.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a chamada. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#8B0000', '#FFFF00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.container}
      >
        <LogoCerebro />
        <Text style={styles.titulo}>Emergência</Text>

        <ScrollView contentContainerStyle={styles.body}>
          <Text style={styles.title2}>Como funciona?</Text>

          <Text style={styles.label}>
            O botão de emergência tem como principal função auxiliar em momentos de urgência médica.{'\n\n'}
            Ao clicar no botão você será encaminhado para uma ligação com a ambulância local,
            tendo acesso fácil ao atendimento médico.
          </Text>

          <Text style={styles.title3}>Quando deve ser usado?</Text>

          <Text style={styles.label2}>
            Essa função só deve ser utilizada quando houver uma situação de emergência ou risco de vida.{'\n\n'}
            É importante verificar a gravidade do caso antes de ligar, para não sobrecarregar o sistema de emergência.{'\n\n'}
            Não se deve acionar o SAMU em situações clínicas não urgentes, como: dor lombar crônica, febre baixa, problemas crônicos de saúde.
            Se for necessário acionar a ambulância CLIQUE NO SOS:
          </Text>

          <TouchableOpacity style={styles.buttonLigacao} onPress={handleEmergencyCall}>
            <Text style={styles.buttonText}>SOS</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
      <BarraNavegacao />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 5,
    fontFamily: 'Calistoga_400Regular',
  },
  body: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 50,
    width: '100%',
    alignItems: 'flex-start',
    paddingBottom: 200,
  },
  title2: {
    color: 'black',
    marginHorizontal: 10,
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Poppins_700Bold',
  },
  label: {
    color: 'black',
    textAlign: 'left',
    fontSize: 13,
    marginHorizontal: 10,
    marginTop: 5,
    fontFamily: 'Poppins_400Regular',
  },
  title3: {
    color: 'black',
    marginHorizontal: 10,
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'Poppins_700Bold',
  },
  label2: {
    color: 'black',
    textAlign: 'left',
    fontSize: 13,
    marginHorizontal: 10,
    marginTop: 5,
    fontFamily: 'Poppins_400Regular',
  },
  buttonLigacao: {
    backgroundColor: '#ec2300',
    padding: 13,
    marginTop: 13,
    width: 80,
    height: 80,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});