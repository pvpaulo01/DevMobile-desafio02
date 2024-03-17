import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

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
      <Text style={[styles.text, darkMode ? styles.darkText : styles.lightText]}>Conteúdo da tela Home</Text>
      <Text style={[styles.text, darkMode ? styles.darkText : styles.lightText]}>
        {darkMode ? '' : ''}
      </Text>
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
    backgroundColor: 'black', // Cor de fundo no modo escuro
  },
  text: {
    fontSize: 18,
  },
  lightText: {
    color: '#000000', // Cor do texto no modo claro
  },
  darkText: {
    color: '#ffffff', // Cor do texto no modo escuro
  },
});

export default Home;
