import React, { useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  PixelRatio,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebaseConnection';
import { db } from '../firebaseConnection';
import { setDoc, doc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const { width } = Dimensions.get('window');
const isTablet = width > 600;

export default function Cadastrar() {
  const navigation = useNavigation();
  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const senhaRef = useRef(null);
 
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister() {
    if (!email || !senha || !nome) {
      setError('Preencha todos os campos!');
      return;
    }

    if (senha.length < 6) {
    setError('A senha deve conter pelo menos 6 caracteres!');
    return;
    }

    if (!/\d/.test(senha)) {
    setError('A senha deve conter pelo menos um número!');
    return;
    }

    if (!/[A-Z]/.test(senha)) {
    setError('A senha deve conter pelo menos uma letra maiúscula!');
    return;
    }

    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Salva o nome no Firestore
    await setDoc(doc(db, 'usuarios', user.uid), {
      nome: nome,
      email: email,
      criadoEm: new Date()
    });
    
    setError('');
    navigation.navigate('Home');
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
    setError('Já existe uma conta com este email!');
  } else if (err.code === 'auth/invalid-email') {
    setError('Email inválido!');
  } else {
    setError('Erro ao cadastrar. Tente novamente.');
  }
  }
  }

  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hp('10%') : hp('5%')}
      >
        <LinearGradient
          colors={['#6495ed', '#ba55d3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 0.5 }}
          style={styles.container}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Bem Vindo(a) ao</Text>
              <Image
                source={require('../assets/logoBorbRoxoClaro.png')}
                style={styles.borboleta}
                resizeMode="contain"
              />
              <Image
                source={require('../assets/icons8-cérebro-100.png')}
                style={styles.brain}
                resizeMode="contain"
              />
            </View>

            <View style={styles.form}>
              <Text style={styles.title2}>Cadastro</Text>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                ref={nomeRef}
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#444"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
                blurOnSubmit={false}
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                ref={emailRef}
                style={styles.input}
                placeholder="Digite um email"
                placeholderTextColor="#444"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => senhaRef.current.focus()}
                blurOnSubmit={false}
                value={email}
                onChangeText={setEmail}
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
                      placeholder="Digite uma senha"
                      placeholderTextColor="#444"
                      secureTextEntry={!showPassword}
                      returnKeyType="done"
                      value={senha}
                      onChangeText={setSenha}
                      />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 10 }}>
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#444"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

              {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}

              <Text style={styles.footerText}>
                Já possui uma conta?{' '}
                <Text
                  style={styles.loginLink}
                  onPress={() => navigation.navigate('Login')}
                >
                  Login
                </Text>
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
  
  );
}

const fontScale = PixelRatio.getFontScale();

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: hp('10%'), // Padding extra para evitar corte pelo teclado
  },
  header: {
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  title: {
    color: '#fff',
    fontSize: wp('5%') / fontScale, // Ajustado para densidade de pixels
    fontWeight: '500',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
  borboleta: {
    width: wp('60%'),
    height: hp('8%'),
    marginTop: hp('2%'),
    resizeMode: 'contain',
  },
  brain: {
    width: wp('15%'),
    height: hp('8%'),
    marginTop: hp('19%'),
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
  title2: {
    color: '#fff',
    fontSize: wp('8%') / fontScale, // Ajustado para densidade de pixels
    fontWeight: '500',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginTop: hp('-1%'),
    marginBottom: hp('2%'),
  },
  form: {
    backgroundColor: '#7B68EE',
    width: isTablet ? wp('70%') : wp('90%'), // Ajuste para tablets
    padding: wp('5%'),
    borderRadius: wp('10%'),
    alignItems: 'center',
    marginTop: hp('10%'),
  },
  label: {
    color: '#fff',
    fontSize: wp('4%') / fontScale, // Ajustado para densidade de pixels
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    fontFamily: 'Poppins_700Bold',
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#ffff9e',
    borderRadius: wp('8%'),
    width: wp('80%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    fontSize: wp('3.5%') / fontScale, // Ajustado para densidade de pixels
    fontFamily: 'Poppins_400Regular',
  },
  button: {
    backgroundColor: '#fff',
    width: wp('50%'),
    height: hp('6%'),
    borderRadius: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
        borderWidth: 1,
        borderColor: '#00000010', // Borda leve para consistência
      },
    }),
  },
  buttonText: {
    color: '#ba55d3',
    fontSize: wp('4%') / fontScale, // Ajustado para densidade de pixels
    fontFamily: 'Poppins_700Bold',
  },
  footerText: {
    color: '#fff',
    fontSize: wp('3%') / fontScale, // Ajustado para densidade de pixels
    marginTop: hp('3%'),
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  loginLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});