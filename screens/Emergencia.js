import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoCerebro from '../componentes/LogoCerebro';
import { Ionicons } from '@expo/vector-icons';

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
    
      <LinearGradient
       colors={['#8B0000', '#FFFF00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={wp('7%')} color="white" />
        </TouchableOpacity>
        <LogoCerebro />
        <Text style={styles.titulo}>Emergência</Text>
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
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
 
  );
}

const styles = StyleSheet.create({

  gradientBackground: {
    flex: 1,
    paddingTop: hp('10%'), // Convertido de 80px, consistente com outros
  },
  backButton: {
    position: 'absolute',
    top: hp('5%'), // No topo, como em QuemNosSomos.js
    left: wp('3%'), // Alinhado à esquerda
    padding: wp('2%'),
    zIndex: 2, // Acima de outros elementos
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp('8%'), // Convertido de 30px, consistente com outros
    marginTop: hp('1%'), // Consistente
    fontFamily: 'Calistoga_400Regular',
  },
  body: {
    backgroundColor: '#F3F4F6', // Corrigido de #fff, consistente com outros
    marginTop: hp('6%'), // Consistente com Ferramentas.js
    padding: wp('5%'), // Convertido de 10px
    paddingBottom: hp('8%'), // Convertido de 200px, consistente
    width: '100%',
    alignItems: 'center', // Consistente com outros
  },
  title2: {
    color: 'black',
    fontSize: wp('5%'), // Convertido de 18px
    fontFamily: 'Poppins_700Bold',
    marginTop: hp('2%'), // Convertido de 10px
    marginHorizontal: wp('3%'), // Convertido de 10px
  },
  label: {
    color: 'black',
    textAlign: 'justify',
    fontSize: wp('3.5%'), // Convertido de 13px
    marginHorizontal: wp('3%'), // Convertido de 10px
    marginTop: hp('1%'), // Convertido de 5px
    fontFamily: 'Poppins_400Regular',
  },
  title3: {
    color: 'black',
    fontSize: wp('5%'), // Convertido de 18px
    fontFamily: 'Poppins_700Bold',
    marginTop: hp('3%'), // Convertido de 20px
    marginHorizontal: wp('3%'), // Convertido de 10px
  },
  label2: {
    color: 'black',
    textAlign: 'justify',
    fontSize: wp('3.5%'), // Convertido de 13px
    marginHorizontal: wp('3%'), // Convertido de 10px
    marginTop: hp('1%'), // Convertido de 5px
    fontFamily: 'Poppins_400Regular',
  },
  buttonLigacao: {
    backgroundColor: '#ec2300',
    width: wp('20%'), // Convertido de 80px
    height: wp('20%'), // Convertido de 80px
    borderRadius: wp('50%'), // Convertido de 999px para círculo
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'), // Convertido de 13px
    padding: wp('3%'), 
    marginBottom:wp('15%'), 
  },
  buttonText: {
    color: 'white',
    fontSize: wp('5.5%'), // Convertido de 20px
    fontFamily: 'Poppins_700Bold', // Consistente com outros botões
  },
});