import { useState } from 'react';
import { useButtonStyles } from '@/ui/styles';
import { Alert, Text, TouchableOpacity } from 'react-native';

const AppwriteConnectionTest = () => {
  const buttonStyles = useButtonStyles();
  const [isTesting, setIsTesting] = useState(false);

  const testConnection = async () => {
    setIsTesting(true);
    try {
      // Test connection by making a request to Appwrite health endpoint
      const response = await fetch('https://fra.cloud.appwrite.io/v1/health', {
        method: 'GET',
        headers: {
          'X-Appwrite-Project': '6989e8c6001b722c5c0f',
        },
      });

      let data;
      try {
        data = await response.text();
      } catch {
        data = 'Unable to read response';
      }

      if (
        response.status === 401 &&
        data.includes('general_unauthorized_scope')
      ) {
        Alert.alert(
          'Success! ✅',
          'You successfully connected to your Appwrite server. The 401 error is expected - the health endpoint requires authentication.',
        );
      } else if (response.ok) {
        Alert.alert(
          'Success',
          'Appwrite connection verified! ✅\n\nServer is up and responsive.',
        );
      } else {
        Alert.alert(
          'Connection Error',
          `Status: ${response.status}\n\nResponse: ${data || 'No response body'}`,
        );
      }
    } catch (error) {
      Alert.alert(
        'Network Error',
        `Failed to reach Appwrite server.\n\nError: ${error.message}\n\nPlease check:\n• Internet connection\n• Endpoint URL is correct\n• No firewall blocking the request`,
      );
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        {
          position: 'absolute',
          bottom: 20,
          right: 20,
          left: 20,
          alignItems: 'center',
          backgroundColor: 'red',
          opacity: isTesting ? 0.6 : 1,
        },
      ]}
      onPress={testConnection}
      disabled={isTesting}
    >
      <Text style={[buttonStyles.buttonText, { fontSize: 10, color: 'black' }]}>
        {isTesting ? 'Testing...' : 'Test Appwrite Connection'}
      </Text>
    </TouchableOpacity>
  );
};

export default AppwriteConnectionTest;
