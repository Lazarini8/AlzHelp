import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function BarraNavegacao() {
  const navigation = useNavigation();

  return (
      <View style={styles.footerBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
          <Image
            source={require('../assets/homeIcon.png')}
            style={styles.homeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Conteudos')} style={styles.button}>
          <Image
            source={require('../assets/borboletaAmarelaRoxo.png')}
            style={styles.conteudosIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Ferramentas')} style={styles.button}>
          <Image
            source={require('../assets/calendario-icon2.png')}
            style={styles.calendarioIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Mapa')} style={styles.button}>
          <Image
            source={require('../assets/mapa3.png')}
            style={styles.mapaIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.button}>
          <Image
            source={require('../assets/perfil2.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
   
  );
}

const styles = StyleSheet.create({
 
  footerBar: {
    width: '100%',
    height: hp('7%'), // Altura proporcional
    backgroundColor: '#b4a0e4',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
  },
  button: {
    width: wp('18%'), // Proporcional para acomodar ícones maiores
    height: hp('8%'), // Ajustado para ícones maiores
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIcon: {
    width: wp('11%'), // Equivalente a ~40px em 360dp
    height: hp('6%'), // Equivalente a ~40px em 640dp
  },
  conteudosIcon: {
    width: wp('13%'), // Equivalente a ~48px em 360dp
    height: hp('7.8%'), // Equivalente a ~50px em 640dp
  },
  calendarioIcon: {
    width: wp('23.5%'), // Equivalente a ~85px em 360dp
    height: hp('13.3%'), // Equivalente a ~85px em 640dp
  },
  mapaIcon: {
    width: wp('30.5%'), // Equivalente a ~110px em 360dp
    height: hp('9.4%'), // Equivalente a ~60px em 640dp
  },
  profileIcon: {
    width: wp('20.8%'), // Equivalente a ~75px em 360dp
    height: hp('7.8%'), // Equivalente a ~50px em 640dp
  },
});