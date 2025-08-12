import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import AgendaWidget from '../componentes/AgendaWidget';
import { useEventos } from '../EventoContext';
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';



export default function Ferramentas() {
  const navigation = useNavigation();
  const { eventos } = useEventos();
  const { notaDestaque } = useEventos();
  return (

    <View style={{ flex: 1 }}> 
    
        <LinearGradient colors={['#6495ed', '#ba55d3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.container}>

        <LogoCerebro/>
       
          <Text style={styles.titulo}>Ferramentas</Text>
   
    
          <ScrollView contentContainerStyle={styles.body}>
            {/* Aqui o widget sem flex:1 */}
              <View style={{ marginTop: 30, paddingBottom: 20, width: '100%' }}>
                <AgendaWidget eventos={eventos} />
               </View>
            
             <View style={styles.AlinhaBottons}>
                
                <TouchableOpacity style={styles.buttonAlarme} >
                  <Image source={require('../assets/relogio.png')} style={styles.relogioIcon} />
                  <Text style={styles.textoButton}>Relógio</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.buttonGestaoMed} >
                  <Image source={require('../assets/remedio.png')} style={styles.remedioIcon} />
                  <Text style={styles.textoButton}>Medicamentos</Text>
                </TouchableOpacity>  
                 

                <TouchableOpacity style={styles.buttonBlocoN} 
                onPress={() => navigation.navigate('BlocoNotas')}>
                <Image source={require('../assets/blocoNotas.png')} style={styles.blocoNotasIcon} />
                <Text style={styles.textoButton}>Bloco de Notas</Text>
                </TouchableOpacity>  

                
           </View>
          
          </ScrollView>  
             <BarraNavegacao /> 
        </LinearGradient>
        </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text:
  { fontSize: 24, fontWeight: 'bold' },
  
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
    padding: 15,
    marginTop: 50,
    width: '100%',
    alignItems: 'left',
    paddingBottom: 200, //Margem no final para não tampar nenhum conteúdo com o footbar
  },
 

  AlinhaBottons:{
  justifyContent: 'space-evenly', // 🔥 Mesmo espaçamento entre todos os botões
  alignItems: 'center',
  flexDirection: 'row',
  right:15,
  marginTop: 20,
 
  },

  textoButton:{
    color: 'black',
    fontFamily: 'Poppins_700Bold',
    fontSize: 10,
  
  },
  
 buttonBlocoN:{
    backgroundColor: '#693fbb',
    margin:10,
    width: 105,
    height: 120,
    borderRadius: 10,
    position: 'rigth',
    alignItems: 'center',
    alignSelf: 'center',
  },

   buttonGestaoMed:{
    backgroundColor: '#693fbb',
    width: 105,
    height: 120,
    borderRadius: 10,
    position: 'rigth',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonAlarme:{
    backgroundColor: '#693fbb',
    width: 105,
    height: 120,
    margin:10,
    borderRadius: 10,
    position: 'rigth',
    alignItems: 'center',
    alignSelf: 'center',
  },

  relogioIcon:{
  width: 100,
  height: 100,
  resizeMode: 'contain',
  marginTop: 8,
  marginBottom:10,
  },

  remedioIcon:{
  width: 100,
  height: 100,
  resizeMode: 'contain',
  marginTop: 8,
  marginBottom:10,
  },

  blocoNotasIcon:{
  width: 90,
  height: 95,
  resizeMode: 'contain',
  marginTop: 8,
  marginBottom:15,
  },

});

