
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://192.168.29.76:3000/users?username=${username}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.some(user => user.username === username && user.password === password)) {
          Alert.alert('Sucesso', 'Bem Vindo a UNIFAA');
          navigation.navigate('Home', {username}); // Navegar para a tela Home após o login bem-sucedido
        } else {
          Alert.alert('Erro', 'Usuário ou senha inválidos');
        }
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao verificar o usuário. Por favor, tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require('../../../src/assets/Unifaa.png')}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.buttonSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonForgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
