import { z } from 'zod';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useButtonStyles, useStyles } from '@/ui/styles';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const formSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must contain at least one lowercase letter, and one number',
      ),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.confirmPassword === undefined) return true;
      return data.password === data.confirmPassword;
    },
    { message: 'Passwords do not match', path: ['confirmPassword'] },
  );

const AuthScreen = () => {
  const router = useRouter();
  const styles = useStyles();
  const { theme } = useTheme();
  const { login, register } = useAuth();
  const buttonStyles = useButtonStyles();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    unregister,
    trigger,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
    mode: 'onTouched',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!isRegistering) {
      unregister('confirmPassword');
    }
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (isRegistering) {
      clearErrors();
    } else {
      trigger();
    }
  }, [isRegistering, unregister, trigger, clearErrors]);

  const onSubmit = async (data) => {
    clearErrors('root');
    setVerificationSent(false);
    const { email, password } = data;

    let response;

    if (isRegistering) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }

    if (response?.error) {
      Alert.alert('Error: ', response.error);
      setError('root', { type: 'server', message: response.error });
      return;
    }

    if (response?.needsVerification) {
      setVerificationSent(true);
      setIsRegistering(false);
      return;
    }

    if (response?.verificationError) {
      Alert.alert(
        'Verification email could not be sent',
        response.verificationError,
      );
    }

    router.replace('/notes');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { flexGrow: 1 }]}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <Text testID='auth-title' style={styles.title}>
          {isRegistering ? 'Sign Up' : 'Login'}
        </Text>
        {verificationSent && (
          <Text
            testID='auth-verification-sent'
            style={[
              styles.subTitle,
              { marginBottom: 16, color: theme.successText },
            ]}
          >
            Check your email to verify your account. Once verified, log in
            below.
          </Text>
        )}
        {errors.root && (
          <Text testID='auth-error' style={styles.errorText}>
            {errors.root?.message}
          </Text>
        )}
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                testID='auth-email-input'
                nativeID='auth-email-input'
                accessibilityLabel='Email input'
                style={
                  errors.email ? styles.errorInputField : styles.authInputField
                }
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize='none'
                autoComplete='email'
                autoCorrect={false}
                keyboardType='email-address'
                placeholder='Enter your email...'
                placeholderTextColor={theme.placeholderText}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View
                style={[
                  errors.password
                    ? styles.errorInputField
                    : styles.authInputField,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 0,
                  },
                ]}
              >
                <TextInput
                  testID='auth-password-input'
                  nativeID='auth-password-input'
                  accessibilityLabel='Password input'
                  style={[
                    errors.password
                      ? styles.errorInputField
                      : styles.authInputField,
                    {
                      flex: 1,
                      marginBottom: 0,
                      borderWidth: 0,
                      paddingRight: 36,
                      backgroundColor: 'transparent',
                    },
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCorrect={false}
                  keyboardType='default'
                  placeholder='Enter your password...'
                  placeholderTextColor={theme.placeholderText}
                  secureTextEntry={!showPassword}
                  textContentType='password'
                />
                <TouchableOpacity
                  testID='auth-password-visibility-toggle'
                  accessibilityLabel={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ padding: 8, position: 'absolute', right: 4 }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={theme.secondaryText}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </>
          )}
        />
        {isRegistering && (
          <Controller
            control={control}
            name='confirmPassword'
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <View
                  style={[
                    errors.confirmPassword
                      ? styles.errorInputField
                      : styles.authInputField,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingRight: 0,
                    },
                  ]}
                >
                  <TextInput
                    testID='auth-confirm-password-input'
                    style={[
                      errors.confirmPassword
                        ? styles.errorInputField
                        : styles.authInputField,
                      {
                        flex: 1,
                        marginBottom: 0,
                        borderWidth: 0,
                        paddingRight: 36,
                        backgroundColor: 'transparent',
                      },
                    ]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCorrect={false}
                    keyboardType='default'
                    placeholder='Confirm your password...'
                    placeholderTextColor={theme.placeholderText}
                    secureTextEntry={!showPassword}
                    textContentType='password'
                  />
                  <TouchableOpacity
                    testID='auth-confirm-password-visibility-toggle'
                    accessibilityLabel={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ padding: 8, position: 'absolute', right: 4 }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={18}
                      color={theme.secondaryText}
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </>
            )}
          />
        )}

        <TouchableOpacity
          testID='auth-submit-button'
          style={[
            buttonStyles.button,
            {
              backgroundColor: theme.secondaryButtonBackground,
              marginTop: 20,
              opacity: isValid ? 1 : 0.5,
            },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
