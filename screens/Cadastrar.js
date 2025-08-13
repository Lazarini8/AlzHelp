// Cadastro.js
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';

export default function Cadastro() {
  const navigation = useNavigation();
  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const senhaRef = useRef(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // ajuste se tiver header fixo
    >

    <LinearGradient colors={['#6495ed', '#ba55d3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 0.5 }}
      style={styles.container}>

     <ScrollView 
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{flexGrow: 1}} 
              showsVerticalScrollIndicator={false}
            >
      
      <Text style={styles.title}>Bem Vindo(a) ao</Text>
      <Image source={require('../assets/logoBorbRoxoClaro.png')} style={styles.borboleta} />
      <Image source={require('../assets/icons8-cérebro-100.png')} style={styles.brain} />
     
     
      <View style={styles.form}>
        <Text style={styles.title2}>Cadastro</Text>
        <Text style={styles.label}>Nome</Text>
        <TextInput ref={nomeRef} style={styles.input} placeholder="Digite seu nome completo" placeholderTextColor="#444" returnKeyType="next"
        onSubmitEditing={() => emailRef.current.focus()} blurOnSubmit={false}/>

        <Text style={styles.label}>Email</Text>
        <TextInput ref={emailRef} style={styles.input} placeholder="Digite seu email" placeholderTextColor="#444" keyboardType="email-address" returnKeyType="next"
        onSubmitEditing={() => senhaRef.current.focus()} blurOnSubmit={false} />

        <Text style={styles.label}>Senha</Text>
        <TextInput ref={senhaRef} style={styles.input} placeholder="Digite uma senha" placeholderTextColor="#444" secureTextEntry returnKeyType="done"
        onSubmitEditing={() => console.log('Cadastro finalizado')}/>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        
        

        <Text style={styles.footerText}>
          Já possui uma conta? <Text
                style={styles.buttonText}
                onPress={() => navigation.navigate('Login')}> Login</Text>
        </Text>
      </View>
      </ScrollView>
    </LinearGradient>
    </KeyboardAvoidingView>
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
    marginTop: 60,
    justifyContent: 'center', // Alinha no eixo vertical
    alignItems: 'center',     // Alinha no eixo horizontal
    alignSelf: 'center', //  Adicione isso para centralizar o botão dentro do form
    zIndex: 1,
  },
  brain: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: 210,
    alignSelf: 'center',
    zIndex: 1,
  },
  title2: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
    marginTop: -60,
    fontFamily: 'Poppins_700Bold',
  },
  form: {
    backgroundColor: '#7B68EE',
    padding: 40,
    minHeight: '75%',
    marginTop: 210,
    justifyContent: 'center',
    borderRadius: 40, // 🔥 Aqui arredonda as bordas
    
  },
  label: {
    color: '#fff',
    marginTop: 9,
    marginBottom: 5,
    fontFamily: 'Poppins_700Bold',
  },
  input: {
    backgroundColor: '#ffff9e',
    borderRadius: 30,
     width: 320, 
    paddingHorizontal: 15,
    paddingVertical: 12,
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
