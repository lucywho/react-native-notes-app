import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { styles, buttonStyles } from '@/ui/styles';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const AuthScreen = () => {
  const router = useRouter();
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(false);

  const handleAuth = async () => {
    setError(false);

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password');
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    let response;

    if (isRegistering) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }

    if (response?.error) {
      Alert.alert('Error: ', response.error);
      return;
    }

    router.replace('/notes');
  };

  return (
    <View style={styles.container}>
      <Text testID='auth-title' style={styles.title}>
        {isRegistering ? 'Sign Up' : 'Login'}
      </Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        testID='auth-email-input'
        style={styles.authInputField}
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect={false}
        keyboardType='email-address'
        placeholder='Enter your email...'
        placeholderTextColor='#8040bf'
      />
      <TextInput
        testID='auth-password-input'
        style={styles.authInputField}
        value={password}
        onChangeText={setPassword}
        autoCorrect={false}
        keyboardType='default'
        placeholder='Enter your password...'
        placeholderTextColor='#8040bf'
        secureTextEntry
        textContentType='password'
      />
      {isRegistering && (
        <TextInput
          testID='auth-confirm-password-input'
          style={styles.authInputField}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          keyboardType='default'
          placeholder='Confirm your password...'
          placeholderTextColor='#8040bf'
          secureTextEntry
          textContentType='password'
        />
      )}

      <TouchableOpacity
        testID='auth-submit-button'
        style={[
          buttonStyles.button,
          { backgroundColor: 'green', marginTop: 20 },
        ]}
        onPress={handleAuth}
      >
        <Text style={buttonStyles.buttonText}>
          {isRegistering ? 'Sign Up' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID='auth-toggle-mode'
        onPress={() => setIsRegistering(!isRegistering)}
      >
        <Text style={[styles.subTitle, { marginTop: 20 }]}>
          {isRegistering ? (
            <Text>
              Already have an account?{' '}
              <Text style={styles.linkText}>Login</Text>
            </Text>
          ) : (
            <Text>
              Don&apos;t have an account yet?{' '}
              <Text style={styles.linkText}>Sign Up</Text>
            </Text>
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
