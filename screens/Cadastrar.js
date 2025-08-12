// Cadastro.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#6495ed', '#ba55d3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 0.5 }}
      style={styles.container}>
      
      <Text style={styles.title}>Bem Vindo(a) ao</Text>
     <Image source={require('../assets/logoBorbRoxoClaro.png')} style={styles.borboleta} />
      <Image source={require('../assets/icons8-cérebro-100.png')} style={styles.brain} />
     

      <View style={styles.form}>
        <Text style={styles.title2}>Cadastro</Text>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#444" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Digite seu email" placeholderTextColor="#444" keyboardType="email-address" />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="Digite uma senha" placeholderTextColor="#444" secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        
        

        <Text style={styles.footerText}>
          Já possui uma conta? <Text style={styles.login}>Login</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 1,
    marginTop: 10,
    fontFamily: 'Poppins_700Bold',
  },
 
   borboleta: {
    width: 250,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: 120,
    justifyContent: 'center', // Alinha no eixo vertical
    alignItems: 'center',     // Alinha no eixo horizontal
    alignSelf: 'center', //  Adicione isso para centralizar o botão dentro do form
    zIndex: 1,
  },
  brain: {
    width: 80,
    height: 90,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: 230,
    alignSelf: 'center',
    zIndex: 1,
  },
  title2: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
    marginTop: -20,
    fontFamily: 'Poppins_700Bold',
  },
  form: {
    backgroundColor: '#7B68EE',
    padding: 20,
    minHeight: '70%',
    marginTop: 150,
    justifyContent: 'center',
    borderRadius: 40, // 🔥 Aqui arredonda as bordas
    
  },
  label: {
    color: '#fff',
    marginTop: 2,
    marginBottom: 5,
    fontFamily: 'Poppins_700Bold',
  },
  input: {
    backgroundColor: '#ffff9e',
    borderRadius: 30,
     width: 320, 
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
  },
  button: {
    width: 200,   // Largura do botão
    height: 50,   // Altura do botão
    borderRadius: 60, // Aqui arredonda as bordas
    justifyContent: 'center', // Alinha no eixo vertical
    alignItems: 'center',     // Alinha no eixo horizontal
    alignSelf: 'center', //  Adicione isso para centralizar o botão dentro do form
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginTop: 30,
  },
  buttonText: {
    color: '#ba55d3',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold'
    
  },
  footerText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
  },
  login: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
});
