import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, PixelRatio, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AgendaWidget from '../componentes/AgendaWidget';
import { useEventos } from '../EventoContext';
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';

const { width } = Dimensions.get('window');
const isTablet = width > 600;

export default function Home() {
  const navigation = useNavigation();
  const { eventos, notaDestaque } = useEventos();

  // Log para verificar o valor de notaDestaque
  console.log('notaDestaque:', notaDestaque);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.container}
      >
        <LogoCerebro />

        <View style={styles.destaqueSection}>
          {notaDestaque ? (
            <View style={styles.destaqueContainer}>
              <Text style={styles.reminderTitulo}>Nota Destacada</Text>
              <View style={styles.formContainer}>
                <Text style={styles.tituloNota}>{notaDestaque.title}</Text>
                <Text style={styles.destaqueText}>{notaDestaque.content.substring(0, 25)}...</Text>
                <TouchableOpacity onPress={() => navigation.navigate('BlocoNotas')}>
                  <Text style={styles.link}>Ver completa</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.reminder}>Nenhuma nota destacada</Text>
          )}
        </View>

        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Conteudos')}
          >
            <Text style={styles.buttonText}>Possui alguma dúvida?</Text>
            <Text style={styles.buttonText}>Pesquise aqui!</Text>
          </TouchableOpacity>

          <View style={styles.agendaContainer}>
            <AgendaWidget eventos={eventos} />
          </View>

          <TouchableOpacity
            style={styles.buttonEmergency}
            onPress={() => navigation.navigate('Emergencia')}
          >
            <Text style={styles.buttonText}>Emergência</Text>
          </TouchableOpacity>

          <Text style={styles.title2}>Como navegar:</Text>

          <Text style={styles.label}>
            Cada símbolo a seguir corresponde a uma área de nosso aplicativo e está
            presente em nossa barra de navegação.
          </Text>

          {/* Itens de navegação */}
          <View style={styles.row}>
            <Image
              source={require('../assets/homeIcon.png')}
              style={styles.iconNavegar}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.label2}>Home</Text>
              <Text style={styles.label}>Tela inicial</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Image
              source={require('../assets/borboletaAmarelaRoxo.png')}
              style={styles.iconNavegar}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.label2}>Conteúdos</Text>
              <Text style={styles.label}>
                Página contendo materiais{'\n'}sobre a Doença de{'\n'}Alzheimer (DA).
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Image
              source={require('../assets/calendario-icon2.png')}
              style={styles.iconNavegar}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.label2}>Ferramentas</Text>
              <Text style={styles.label}>
                Página das ferramentas{'\n'}como alarme, agenda e{'\n'}gestão de medicamentos.
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Image
              source={require('../assets/mapa3.png')}
              style={styles.iconNavegar}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.label2}>Mapeamento</Text>
              <Text style={styles.label}>
                Apresenta o mapeamento{'\n'}de clínicas, hospitais e áreas{'\n'}de auxílio.
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Image
              source={require('../assets/perfil2.png')}
              style={styles.iconNavegar}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.label2}>Perfil</Text>
              <Text style={styles.label}>Informações e atividade</Text>
            </View>
          </View>
        </ScrollView>
        <BarraNavegacao />
      </LinearGradient>
    </SafeAreaView>
  );
}

const fontScale = PixelRatio.getFontScale();

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6495ed', // Cor de fundo para combinar com o gradiente
  },
  container: {
    flex: 1,
    paddingTop: hp('8%'),
    alignItems: 'center',
  },
  destaqueSection: {
    marginTop: hp('2%'),
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  destaqueContainer: {
    alignItems: 'center',
    width: isTablet ? wp('80%') : wp('90%'),
    marginBottom: hp('2%'),
  },
  reminderTitulo: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Calistoga_400Regular',
    fontSize: wp('3.5%') / fontScale,
    marginHorizontal: wp('10%'),
    marginTop: hp('-2%'),
    marginBottom: hp('1%'),
  },
  formContainer: {
    backgroundColor: '#fff', // Fundo claro garantido
    borderRadius: wp('3%'),
    padding: wp('4%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
        borderWidth: 1,
        borderColor: '#00000010',
      },
    }),
    width: isTablet ? wp('70%') : wp('80%'),
    height: hp('20%'),
    marginBottom: hp('1%'),
    zIndex: 3,
  },
  tituloNota: {
    color: '#000',
    fontSize: wp('4.5%') / fontScale,
    fontFamily: 'Poppins_700Bold',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  destaqueText: {
    color: '#000',
    fontSize: wp('3.5%') / fontScale,
    fontFamily: 'Poppins_400Regular',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  reminder: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Calistoga_400Regular',
    fontSize: wp('3.5%') / fontScale,
    marginHorizontal: wp('10%'),
    marginTop: hp('4%'),
    marginBottom: hp('10%'),
  },
  link: {
    color: '#7B68EE',
    fontFamily: 'Calistoga_400Regular',
    fontSize: wp('3.5%') / fontScale,
    textAlign: 'center',
  },
  body: {
    backgroundColor: '#F3F4F6',
    paddingTop: hp('6%'),
    paddingBottom: hp('25%'),
    minHeight: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#693fbb',
    width: isTablet ? wp('70%') : wp('80%'),
    height: hp('10%'),
    borderRadius: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: hp('1%'),
    marginTop: hp('1%'),
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
        borderColor: '#00000010',
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    fontSize: wp('3.5%') / fontScale,
  },
  buttonEmergency: {
    backgroundColor: '#ec2300',
    width: isTablet ? wp('50%') : wp('60%'),
    height: hp('7%'),
    borderRadius: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: wp('3%'),
    marginTop: hp('2%'),
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
        borderColor: '#00000010',
      },
    }),
  },
  title2: {
    color: '#000',
    fontSize: wp('5%') / fontScale,
    fontFamily: 'Poppins_700Bold',
    marginTop: hp('3%'),
    marginHorizontal: wp('1%'),
  },
  label: {
    color: '#000',
    fontSize: wp('3.5%') / fontScale,
    fontFamily: 'Poppins_400Regular',
    marginTop: hp('0.5%'),
  },
  label2: {
    color: '#000',
    fontSize: wp('3.5%') / fontScale,
    fontFamily: 'Poppins_700Bold',
    marginTop: hp('0.5%'),
  },
  iconNavegar: {
    width: wp('15%'), // Tamanho uniforme para todos os ícones
    height: hp('8%'),
    marginTop: hp('1%'),
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
    width: isTablet ? wp('80%') : wp('90%'),
    justifyContent: 'flex-start',
    paddingHorizontal: wp('5%'),
  },
  textContainer: {
    marginLeft: wp('5%'),
    flexShrink: 1, // Evita quebra de texto em telas menores
  },
  agendaContainer: {
    marginTop: hp('4%'),
    paddingBottom: hp('3%'),
    width: '100%',
    alignItems: 'center',
  },
});