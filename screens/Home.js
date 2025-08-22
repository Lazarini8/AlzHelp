import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; 
import AgendaWidget from '../componentes/AgendaWidget';
import { useEventos } from '../EventoContext';
import LogoCerebro from '../componentes/LogoCerebro';
import BarraNavegacao from '../componentes/BarraNavegacao';


export default function Home() {

  const navigation = useNavigation();
  const { eventos } = useEventos();
   const { notaDestaque } = useEventos();

  return (
    <View style={{ flex: 1 }}> 

      <LinearGradient 
        colors={['#6495ed', '#ba55d3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.container}
      >

         <LogoCerebro/>
       
        <View>
      {notaDestaque ? (
      <View style={styles.destaqueContainer}>
          <Text style={styles.reminderTitulo}>Nota Destacada</Text>
          
        <View style={styles.formContainer}>
          <Text style={styles.tituloNota}>{notaDestaque.title}</Text>
          <Text>{notaDestaque.content.substring(0, 25)}...</Text>
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Conteudos')}>
            <Text style={styles.buttonText}>Possui alguma dúvida?</Text>
            <Text style={styles.buttonText}>Pesquise aqui!</Text>
          </TouchableOpacity>

          {/* Aqui o widget sem flex:1 */}
          <View style={{ marginTop: 30, paddingBottom: 20, width: '100%' }}>
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
              Cada simbolo asseguir corresponde a uma área de nosso aplicativo e estão 
            presentes em nossa barra de navegação.
          </Text> 

          {/* Itens de navegação */}
          <View style={styles.row}>
            <Image source={require('../assets/homeIcon.png')} style={styles.homeNavegar} />
            <View style={{ marginLeft: 29 }}>
              <Text style={styles.label2}>Home</Text>
              <Text style={styles.label}>Tela inicial</Text>
            </View>
          </View >

          <View style={styles.row}>
            <Image source={require('../assets/borboletaAmarelaRoxo.png')} style={styles.conteudosNavegar} />
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.label2}>Conteúdos</Text>
              <Text style={styles.label}>Página contendo materiais {'\n'}sobre a Doença de {'\n'} Alzheimer(DA).</Text>
            </View>
          </View >

          <View style={styles.row}>
            <Image source={require('../assets/calendario-icon2.png')} style={styles.ferramentasNavegar} />  
            <View style={{ marginLeft: -30 }}>
              <Text style={styles.label2}>Ferramentas</Text>
              <Text style={styles.label}>Página das ferramentas{'\n'}como alerme, agenda e{'\n'}gestão de medicamentos.</Text>
            </View>
          </View >

          <View style={styles.row}>
            <Image source={require('../assets/mapa3.png')} style={styles.mapaNavegar} /> 
            <View style={{ marginLeft: -48 }}>
              <Text style={styles.label2}>Mapeamento</Text>
              <Text style={styles.label}>Apresenta o mapeamento {'\n'}de clinicas, hospitais e áreas{'\n'}de auxilio. </Text>
            </View>
          </View >
           
          <View style={styles.row}>
            <Image source={require('../assets/perfil2.png')} style={styles.perfilNavegar} /> 
            <View style={{ marginLeft: -5 }}>
              <Text style={styles.label2}>Perfil</Text>
              <Text style={styles.label}>Informações e atividade  </Text>
            </View>
          </View >   

        </ScrollView>
        <BarraNavegacao /> 
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    resizeMode: 'absolute',
  },

  reminderTitulo: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Calistoga_400Regular',
    marginHorizontal: 50,
    fontSize: 12,
    marginTop: -15,
    marginBottom: 5,
   
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    width: 300,
    height: 150,
    marginBottom: 8,
  
  },
  reminder: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Calistoga_400Regular',
    marginHorizontal: 50,
    fontSize: 12,
    marginTop: 30,
    marginBottom:100,
  },
  link:{
    color: '#7B68EE',
    fontFamily: 'Calistoga_400Regular',
    fontSize: 12,
  },
  scrollView: {
    width: '100%',
  },
  body: {
    backgroundColor: '#d3d3d3',
    marginTop: 50,
    paddingBottom: 200, //Margem no final para não tampar nenhum conteúdo com o footbar
    backgroundColor: '#F3F4F6', // Fundo cinza claro
    minHeight: '100%', // Garante que o body ocupe a tela inteira
  },
  button: {
    backgroundColor: '#693fbb',
    width: 290,
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    marginTop: 15,
  },
  buttonText:{
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    fontSize: 13,
  },
  buttonEmergency:{
    backgroundColor: '#ec2300',
    padding: 13,
    marginTop: 55,
    width: 200,
    height: 50,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title2:{
    color: 'black',
    marginHorizontal: 1,
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'Poppins_700Bold',
  },
  label:{
    color: 'black',
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'Poppins_400Regular',
  },
  label2:{
    color: 'black',
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'Poppins_700Bold',
  },
  homeNavegar:{
    marginTop: 10,
    width: 50,
    height: 50,
  },
  conteudosNavegar:{
    marginTop: 10,
    right: 5,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  ferramentasNavegar:{
    width: 110,
    height: 70,
    right: 24,
    resizeMode: 'contain',
  },
  mapaNavegar:{
    width: 130,
    height: 100,
    right: 39,
    resizeMode: 'contain',
  },
  perfilNavegar:{
    width: 90,
    height: 55,
    right: 20,
    resizeMode: 'contain',
  },
 
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
});
