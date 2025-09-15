import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function Mapa() {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar fontes
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        // Solicitar permissão para localização
        let { status } = await Location.requestForegroundPermissionsAsync();
        let latitude, longitude;

        if (status !== 'granted') {
          console.log('Permissão de localização negada');
          setErrorMsg('Permissão negada. Mostrando São Paulo.');
          // Fallback para São Paulo
          latitude = -23.5505;
          longitude = -46.6333;
        } else {
          // Obter localização atual
          let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
          console.log('Localização:', location.coords);
          latitude = location.coords.latitude;
          longitude = location.coords.longitude;
        }

        // Definir região do mapa
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } catch (error) {
        console.error('Erro ao carregar localização:', error);
        setErrorMsg('Erro ao carregar localização. Mostrando São Paulo.');
        // Fallback para São Paulo
        setRegion({
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const centerOnUser = async () => {
    setIsLoading(true);
    try {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      console.log('Centralizando:', location.coords);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      console.error('Erro ao centralizar:', error);
      setErrorMsg('Erro ao carregar localização. Mostrando São Paulo.');
      setRegion({
        latitude: -23.5505,
        longitude: -46.6333,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#693fbb" />
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={wp('7%')} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mapa</Text>
      </View>

      {/* Mapa */}
      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{errorMsg}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={centerOnUser}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : region ? (
        <View style={styles.contentContainer}>
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
            onRegionChangeComplete={setRegion}
            minZoomLevel={10}
            maxZoomLevel={18}
          />
          <TouchableOpacity style={styles.centerButton} onPress={centerOnUser}>
            <Ionicons name="locate" size={wp('6%')} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#693fbb" />
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Igual a BlocoNotas.js
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('4%'),
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  backButton: {
    padding: wp('2%'),
  },
  headerTitle: {
    fontSize: wp('8%'),
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
    flex: 1,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    overflow: 'hidden',
  },
  centerButton: {
    position: 'absolute',
    bottom: hp('3%'),
    right: wp('5%'),
    backgroundColor: '#693fbb', // Igual a BlocoNotas.js
    borderRadius: wp('3%'),
    padding: wp('3%'),
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins_400Regular',
    color: '#777',
    marginTop: hp('2%'),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  error: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins_400Regular',
    color: 'red',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  retryButton: {
    backgroundColor: '#693fbb',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    elevation: 3,
  },
  retryButtonText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
});