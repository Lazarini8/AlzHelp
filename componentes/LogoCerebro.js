import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function LogoCerebro() {
  return (
    <Image
      source={require('../assets/icons8-cérebro-100.png')}
      style={styles.brain}
    />
  );
}

const styles = StyleSheet.create({
  brain: {
    width: 70,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    top: 30,
    right: -3,
    zIndex: 10,
  },
});
