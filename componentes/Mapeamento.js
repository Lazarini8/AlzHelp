import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import LogoCerebro from './LogoCerebro';

export default function Mapeamento() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);

  // Carregar fontes
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    (async () => {
      // Solicitar permissão para localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização negada');
        return;
      }

      // Obter localização atual
      let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation(currentLocation.coords);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.05, // Zoom inicial
        longitudeDelta: 0.05,
      });

      // Buscar hospitais e clínicas próximos
      if (currentLocation) {
        fetchHospitals(currentLocation.coords.latitude, currentLocation.coords.longitude);
      }
    })();
  }, []);

  const fetchHospitals = async (lat, lng) => {
    try {
      const radius = 5000; // 5km em metros
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lng});
          way["amenity"="hospital"](around:${radius},${lat},${lng});
          node["amenity"="clinic"](around:${radius},${lat},${lng});
          way["amenity"="clinic"](around:${radius},${lat},${lng});
        );
        out center;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: query,
      });

      const data = await response.json();
      if (data.elements && data.elements.length > 0) {
        const hospitalList = data.elements.map(element => ({
          id: element.id,
          name: element.tags?.name || 'Hospital/Clínica Sem Nome',
          latitude: element.lat || element.center?.lat,
          longitude: element.lon || element.center?.lon,
          address: element.tags?.['addr:street'] || 'Endereço não disponível',
        }));
        setHospitals(hospitalList);
      } else {
        Alert.alert('Aviso', 'Nenhum hospital ou clínica encontrado na região');
      }
    } catch (error) {
      console.error('Erro ao buscar hospitais:', error);
      Alert.alert('Erro', 'Falha ao buscar hospitais e clínicas');
    }
  };

  // Função para centralizar o mapa na localização do usuário
  const centerOnUser = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
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
        <View style={styles.logoContainer}>
          <LogoCerebro />
        </View>
        <Text style={styles.headerTitle}>Mapeamento</Text>
      </View>

      {/* Mapa */}
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location && region ? (
        <>
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
            onRegionChangeComplete={setRegion}
            provider="google" // Usa Google Maps como base (opcional, pode ser removido para OSM puro)
          >
            {hospitals.map((hospital) => (
              <Marker
                key={hospital.id}
                coordinate={{
                  latitude: hospital.latitude,
                  longitude: hospital.longitude,
                }}
                title={hospital.name}
                description={hospital.address}
                pinColor="#DC143C" // Cor consistente com botão de emergência
              />
            ))}
          </MapView>
          <TouchableOpacity
            style={styles.centerButton}
            onPress={centerOnUser}
          >
            <Ionicons name="locate" size={wp('6%')} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loading}>Carregando localização...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Mantém consistência com BlocoNotas.js
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
  logoContainer: {
    marginLeft: wp('2%'),
  },
  headerTitle: {
    fontSize: wp('8%'),
    fontFamily: 'Poppins_700Bold',
    color: '#2c3e50',
    flex: 1,
    textAlign: 'center',
  },
  map: {
    flex: 1,
  },
  error: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins_400Regular',
    color: 'red',
    textAlign: 'center',
    marginTop: hp('5%'),
  },
  loading: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: hp('5%'),
  },
  centerButton: {
    position: 'absolute',
    bottom: hp('3%'),
    right: wp('3%'),
    backgroundColor: '#693fbb', // Cor consistente com botões
    borderRadius: wp('3%'),
    padding: wp('3%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: wp('2%'),
  },
});