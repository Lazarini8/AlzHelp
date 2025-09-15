import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Calistoga_400Regular } from '@expo-google-fonts/calistoga';
import { View, ActivityIndicator, StyleSheet, Image, Animated } from 'react-native';

import Cadastro from './screens/Cadastrar';
import Login from './screens/Login';
import Home from './screens/Home';
import Emergencia from './screens/Emergencia';
import Conteudos from './screens/Conteudos';
import Ferramentas from './screens/Ferramentas';
import Mapa from './screens/Mapa';
import Perfil from './screens/Perfil';
import Agenda from './screens/Agenda';
import QuemNosSomos from './QuemNosSomos';
import AgendaWidget from './componentes/AgendaWidget';
import { EventoProvider } from './EventoContext';
import BlocoNotas from './screens/BlocoNotas';
import Medicamentos from './screens/Medicamentos';
import Mapeamento from './componentes/Mapeamento'


const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Calistoga_400Regular,
  });

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // tempo da tela de carregamento

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <EventoProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Emergencia" component={Emergencia} />
          <Stack.Screen name="Conteudos" component={Conteudos} />
          <Stack.Screen name="Ferramentas" component={Ferramentas} />
          <Stack.Screen name="Medicamentos" component={Medicamentos} />
          <Stack.Screen name="Mapa" component={Mapa} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Agenda" component={Agenda} />
          <Stack.Screen name="AgendaWidget" component={AgendaWidget} />
          <Stack.Screen name="BlocoNotas" component={BlocoNotas} />
          <Stack.Screen name="QuemNosSomos" component={QuemNosSomos} />
           <Stack.Screen name="Mapeamento" component={Mapeamento} />
        
        </Stack.Navigator>
      </EventoProvider>
    </NavigationContainer>
  );
}

function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de fade in da logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Timer para ir para próxima tela
    const timer = setTimeout(() => {
      const isUserLogged = false; // aqui você pode trocar por lógica de login com AsyncStorage

      if (isUserLogged) {
        navigation.replace('Home');
      } else {
        navigation.replace('Cadastro');
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/logoBorbRoxoEscuro.png')}
        style={[styles.borboleta, { opacity: fadeAnim }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#693fbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borboleta: {
    height: 200,
    width: 230,
  },
});
