import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function CronometroScreen() {
  const sonidoLocalRef = useRef(null);
  const sonidoRemotoRef = useRef(null);

  useEffect(() => {
    const cargarSonidoLocal = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/sonidoCampa.mp3')
      );
      sonidoLocalRef.current = sound;
    };

    const cargarSonidoRemoto = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { shouldPlay: false }
      );
      sonidoRemotoRef.current = sound;
    };

    cargarSonidoLocal();
    cargarSonidoRemoto();

    return () => {
      if (sonidoLocalRef.current) sonidoLocalRef.current.unloadAsync();
      if (sonidoRemotoRef.current) sonidoRemotoRef.current.unloadAsync();
    };
  }, []);

  const reproducirSonidoLocal = async () => {
    if (sonidoLocalRef.current) {
      await sonidoLocalRef.current.replayAsync();
    }
  };

  const reproducirSonidoRemoto = async () => {
    if (sonidoRemotoRef.current) {
      await sonidoRemotoRef.current.replayAsync();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boton} onPress={reproducirSonidoLocal}>
        <Text style={styles.textoBoton}>Sonido Local</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.boton, { marginTop: 20 }]} onPress={reproducirSonidoRemoto}>
        <Text style={styles.textoBoton}>Sonido Remoto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  boton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});