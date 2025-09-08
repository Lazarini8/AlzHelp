import React, { useRef } from 'react';
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

const { width } = Dimensions.get('window');
const isTablet = width > 600;

export default function Cadastro() {
  const navigation = useNavigation();
  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const senhaRef = useRef(null);

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
              />

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
              />

              <Text style={styles.label}>Senha</Text>
              <TextInput
                ref={senhaRef}
                style={styles.input}
                placeholder="Digite uma senha"
                placeholderTextColor="#444"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={() => console.log('Cadastro finalizado')}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

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