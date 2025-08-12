import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; 
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';

export default function Perfil() {
  const navigation = useNavigation(); 
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground} // <== renomeado
      >
        <LogoCerebro />
       

        <Image source={require('../assets/logoBorbRoxoClaro.png')} style={styles.borboleta} />

        <ScrollView contentContainerStyle={styles.body}>
        
        <View style={styles.retangulo} >
          <Image source={require('../assets/perfil4.png')} style={styles.profileIcon} />
          <TouchableOpacity style={styles.buttonEditar}>
             <Text style={styles.buttonTextEditar}>Editar Informações</Text>
          </TouchableOpacity>
          
         </View>

         <View style={styles.opcoes} >

            <TouchableOpacity style={styles.buttonOpcoes}>
                  <Image source={require('../assets/confIcon.png')} style={styles.confIcon} />
                  <Text style={styles.buttonText}>Configurações </Text>
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

            <TouchableOpacity style={styles.buttonOpcoes} onPress={() => navigation.navigate('QuemNosSomos')}>
                 <Image source={require('../assets/nosIcon.png')} style={styles.nosIcon} /> 
                  <Text style={styles.buttonText}>Quem nós somos?</Text>
                 
            </TouchableOpacity>
              
         </View> 

        </ScrollView>
        <BarraNavegacao />

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { // Renomeado de container
    flex: 1,
    paddingTop: 210,
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
  backgroundColor: '#d3d3d3',
  paddingBottom: 100,
  width: '100%',
  alignItems: 'flex-start',
  flexGrow: 1, // faz com que o conteúdo tente ocupar a altura total da tela
},

  borboleta: {
    width: 300,
    height: 80,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: 85,
    marginBottom: 25,
    alignSelf: 'center',
    zIndex: 1,
  },

  retangulo: {
    width: 360,
    height: 150,
    backgroundColor: '#693fbb',
    marginTop:40,
    justifyContent: 'center',  // Alinha a imagem no centro vertical
  },
   profileIcon: {
    width: 60,
    height: 60,
    left:10,
    
  },
  buttonEditar:{
     backgroundColor: '#b98bed',
      width: 200,
      height: 34,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
  },
  buttonTextEditar:{
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  opcoes:{
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop:15,
    
  },
  buttonOpcoes:{
    backgroundColor: '#ffffffff',
      width: 325,
      height: 55,
      borderRadius: 23,
      marginBottom:10,
      flexDirection: 'row',       // Alinha lado a lado
      alignItems: 'center',       // Alinha verticalmente
      padding: 10,
  },
    buttonText:{
      color: 'black',
     fontSize: 14,
     fontFamily: 'Poppins_400Regular',
     marginLeft: 10, 
     
    },
    confIcon:{
      width: 30,
      height: 30,
    },
     lembreteIcon:{
      width: 27,
      height: 29,
    },
     privacidadeIcon:{
      width: 32,
      height: 32,
    },
    ajudaIcon:{
      width: 35,
      height: 35,
    },
    nosIcon:{
      width: 41,
      height: 29,
    },
    
});
