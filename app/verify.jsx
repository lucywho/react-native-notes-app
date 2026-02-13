import { styles } from '@/ui/styles';
import { useEffect, useState } from 'react';
import { account } from '@/services/appwrite';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

const VerifyScreen = () => {
  const { userId, secret } = useLocalSearchParams();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userId || !secret) {
      setStatus('error');
      setMessage(
        'Invalid verification link. The link may have expired or been used.',
      );
      return;
    }

    const verify = async () => {
      try {
        await account.updateVerification(userId, secret);
        setStatus('success');
        setMessage('Your email has been verified. You can return to the app.');
      } catch (err) {
        setStatus('error');
        setMessage(
          err?.message || 'Verification failed. The link may have expired.',
        );
      }
    };

    verify();
  }, [userId, secret]);

  if (status === 'verifying') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='rebeccapurple' />
        <Text style={styles.text}>Verifying your email...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          status === 'success' ? styles.successText : styles.errorText,
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

export default VerifyScreen;
