import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';



export default function Mapa() {
  const navigation = useNavigation(); 
  return (

    <View style={{ flex: 1 }}> 
    
        <LinearGradient colors={['#6495ed', '#ba55d3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.container}>

           <LogoCerebro/>
            <BarraNavegacao />
          <Text style={styles.titulo}>Mapa</Text>
   
    
          <ScrollView contentContainerStyle={styles.body}>
           
          </ScrollView>  
    
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
    padding: 10,
    marginTop: 50,
    width: '100%',
    alignItems: 'left',
    paddingBottom: 80,
  },

  
});

