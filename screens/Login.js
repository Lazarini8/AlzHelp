import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConnection';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const senhaRef = useRef(null);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      setError('Preencha todos os campos!');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      setError('');
      navigation.navigate('Home');
    } catch (err) {
      setError('Email ou senha incorretos!');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 0.5 }}
        style={styles.container}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Bem Vindo(a) ao</Text>
          <Image source={require('../assets/logoBorbRoxoClaro.png')} style={styles.borboleta} />
          <Image source={require('../assets/icons8-cérebro-100.png')} style={styles.brain} />

          <View style={styles.form}>
            <Text style={styles.title2}>Login</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="Digite seu email"
              placeholderTextColor="#444"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => senhaRef.current.focus()}
              blurOnSubmit={false}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Senha</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 320, backgroundColor: '#ffff9e', borderRadius: 30, marginBottom: 10 }}>
              <TextInput
                ref={senhaRef}
                style={{
                  flex: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  fontSize: 13,
                  color: '#444',
                  fontFamily: 'Poppins_400Regular',
                }}
                placeholder="Digite sua senha"
                placeholderTextColor="#444"
                secureTextEntry={!showPassword}
                returnKeyType="done"
                value={senha}
                onChangeText={setSenha}
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 10 }}>
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#444"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {error ? <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>{error}</Text> : null}

            <Text style={styles.footerText}>
              Não possui uma conta?{' '}
              <Text
                style={styles.buttonText}
                onPress={() => navigation.navigate('Cadastro')}
              >Cadastrar</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    borderRadius: 40,
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
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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