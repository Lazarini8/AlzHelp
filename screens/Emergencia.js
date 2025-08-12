// Emergencia.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';


export default function Emergencia() {
   const navigation = useNavigation(); 
  return (

    <View style={{ flex: 1 }}> 
      <LinearGradient colors={['#8B0000', '#FFFF00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.container}>
        
        <LogoCerebro/>
        
        <Text style={styles.titulo}>Emergência</Text>
    
      <ScrollView contentContainerStyle={styles.body}>
              <Text style={styles.title2}>Como funciona?</Text>

          <Text style={styles.label}>
               O botão de emergência tem como principal função auxiliar 
               em momentos de urgência médica.{'\n\n'}
               Ao clicar no botão você será encaminhado para uma
               ligação com a ambulância local,
              tendo acesso fácil ao atendimento médico.
           </Text>

           <Text style={styles.title3}>Quando deve ser usado?</Text>

           <Text style={styles.label2}>
                Essa função só deve ser utilizada quando houver uma 
                situação de emergência ou risco de vida.{'\n\n'}
                É importante verificar a gravidade do caso antes de ligar, 
                para não sobrecarregar o sistema de emergência.{'\n\n'}
                Não se deve acionar o SAMU em situações clínicas não urgentes, 
                como: dor lombar crônica, febre baixa, problemas crônicos de saúde. 
                Se for necessário acionar a ambulância CLIQUE NO SOS:
            </Text>
            
         <TouchableOpacity style={styles.buttonLigacao}>
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
    resizeMode: 'absolute',
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 5,
    fontSize: 30, 
    fontFamily: 'Calistoga_400Regular',
    
  },
   body: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    marginTop: 50,
    width: '100%',
    alignItems: 'left',
    paddingBottom: 200, //Margem no final para não tampar nenhum conteúdo com o footbar
  
  },
  title2:{
    color: 'black',
    marginHorizontal: 1,
    fontSize: 18,
    marginTop: 1,
    fontFamily: 'Poppins_700Bold',
  },
   
  label:{
    color: 'black',
    textAlign: 'left',
    fontSize: 13,
    marginTop: -4,
    fontFamily: 'Poppins_400Regular',
  },
  title3:{
    color: 'black',
    marginHorizontal: -5,
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Poppins_700Bold',
  },
  label2:{
    color: 'black',
    textAlign: 'left',
    fontSize: 13,
    marginTop: -4,
    fontFamily: 'Poppins_400Regular',
  },
   buttonLigacao:{
    backgroundColor: '#ec2300',
    padding: 13,
    marginTop: 15,
    borderRadius: 100,
    width: 80,           // 🔥 Largura
    height: 80,          // 🔥 Altura (igual à largura)
    borderRadius: 999,   // 🔥 Deixa o botão totalmente redondo
   justifyContent: 'center', // Alinha no eixo vertical
    alignItems: 'center',     // Alinha no eixo horizontal
    alignSelf: 'center', //  Adicione isso para centralizar o botão dentro do form
  },
  buttonText: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
   
},

});

