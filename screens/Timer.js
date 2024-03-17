import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Timer = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [welcomeText, setWelcomeText] = useState('');
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const text = 'Bem vindo ao Timer';
    let animatedText = '';

    const animateText = (index) => {
      setTimeout(() => {
        animatedText += text[index];
        setWelcomeText(animatedText);
        if (index < text.length - 1) {
          animateText(index + 1);
        }
      }, 100);
    };

    animateText(0);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Feather name={darkMode ? 'sun' : 'moon'} size={24} color={darkMode ? '#d1d1d1' : 'black'} />
        </TouchableOpacity>
      ),
    });
  }, [darkMode, navigation]);

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.text, darkMode ? styles.darkText : styles.lightText]}>{welcomeText}</Text>
      <Text style={[styles.clock, darkMode ? styles.darkText : styles.lightText]}>{currentTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#d1d1d1', // Cor de fundo no modo claro
  },
  darkContainer: {
    backgroundColor: '#000000', // Cor de fundo no modo escuro
  },
  text: {
    fontSize: 28,
  },
  lightText: {
    color: '#000000', // Cor do texto no modo claro
  },
  darkText: {
    color: '#ffffff', // Cor do texto no modo escuro
  },
  clock: {
    fontSize: 36, // Ajuste o tamanho da fonte do relógio aqui
    marginTop: 20,
  },
});

export default Timer;
