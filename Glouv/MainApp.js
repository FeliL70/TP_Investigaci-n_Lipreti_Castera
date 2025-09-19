import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function CronometroScreen() {
  const sonidoRef = useRef(null);

  useEffect(() => {
    const cargarSonido = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/sonidoCampa.mp3')
      );
      sonidoRef.current = sound;
    };

    cargarSonido();

    return () => {
      if (sonidoRef.current) sonidoRef.current.unloadAsync();
    };
  }, []);

  const reproducirSonido = async () => {
    if (sonidoRef.current) {
      await sonidoRef.current.replayAsync();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.boton} onPress={reproducirSonido}>
        <Text style={styles.textoBoton}>Reproducir sonido</Text>
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