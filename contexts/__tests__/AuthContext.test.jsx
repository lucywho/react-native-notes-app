import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import { Text, Pressable } from 'react-native';
import { AuthProvider, useAuth } from '../AuthContext';
import authService from '@/services/authService';

jest.mock('@/services/authService');

const TestConsumer = () => {
  const { user, loading } = useAuth();
  return (
    <>
      <Text testID='loading'>{loading ? 'loading' : 'ready'}</Text>
      <Text testID='user'>{user ? user.email : 'no-user'}</Text>
    </>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authService.getCurrentUser.mockResolvedValue({ error: 'No session' });
  });

  describe('initial load', () => {
    it('calls getCurrentUser on mount', async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(authService.getCurrentUser).toHaveBeenCalled();
      });
    });

    it('sets user when getCurrentUser returns user', async () => {
      const mockUser = { $id: 'user-1', email: 'test@test.com' };
      authService.getCurrentUser.mockResolvedValue(mockUser);

      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('test@test.com');
      });
      expect(screen.getByTestId('loading')).toHaveTextContent('ready');
    });

    it('sets user to null when getCurrentUser returns error', async () => {
      authService.getCurrentUser.mockResolvedValue({ error: 'Unauthorized' });

      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      });
      expect(screen.getByTestId('loading')).toHaveTextContent('ready');
    });
  });

  describe('login', () => {
    it('sets user and returns success when login succeeds', async () => {
      authService.getCurrentUser
        .mockResolvedValueOnce({ error: 'No session' })
        .mockResolvedValueOnce({ $id: 'user-1', email: 'test@test.com' });
      authService.login.mockResolvedValue({ userId: 'user-1' });

      const TestConsumerWithLogin = () => {
        const { user, login } = useAuth();
        return (
          <>
            <Text testID='user'>{user ? user.email : 'no-user'}</Text>
            <Pressable
              testID='login-trigger'
              onPress={() => login('test@test.com', 'password123')}
            >
              <Text>Login</Text>
            </Pressable>
          </>
        );
      };

      const { getByTestId } = render(
        <AuthProvider>
          <TestConsumerWithLogin />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(authService.getCurrentUser).toHaveBeenCalled();
      });

      fireEvent.press(getByTestId('login-trigger'));

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith(
          'test@test.com',
          'password123',
        );
      });

      await waitFor(() => {
        expect(authService.getCurrentUser).toHaveBeenCalledTimes(2);
      });

      expect(getByTestId('user')).toHaveTextContent('test@test.com');
    });

    it('returns error when login fails', async () => {
      authService.getCurrentUser.mockResolvedValue({ error: 'No session' });
      authService.login.mockResolvedValue({
        error: 'Invalid credentials',
      });

      let loginResult;
      const TestConsumerWithLogin = () => {
        const { login } = useAuth();
        return (
          <Pressable
            testID='login-trigger'
            onPress={async () => {
              loginResult = await login('test@test.com', 'wrong');
            }}
          >
            <Text>Login</Text>
          </Pressable>
        );
      };

      const { getByTestId } = render(
        <AuthProvider>
          <TestConsumerWithLogin />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(authService.getCurrentUser).toHaveBeenCalled();
      });

      fireEvent.press(getByTestId('login-trigger'));

      await waitFor(() => {
        expect(loginResult).toEqual({ error: 'Invalid credentials' });
      });

      expect(authService.getCurrentUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('register', () => {
    it('returns error when registration fails', async () => {
      authService.getCurrentUser.mockResolvedValue({ error: 'No session' });
      authService.register.mockResolvedValue({
        error: 'Email already exists',
      });

      let registerResult;
      const TestConsumerWithRegister = () => {
        const { register } = useAuth();
        return (
          <Pressable
            testID='register-trigger'
            onPress={async () => {
              registerResult = await register('test@test.com', 'password123');
            }}
          >
            <Text>Register</Text>
          </Pressable>
        );
      };

      const { getByTestId } = render(
        <AuthProvider>
          <TestConsumerWithRegister />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(authService.getCurrentUser).toHaveBeenCalled();
      });

      fireEvent.press(getByTestId('register-trigger'));

      await waitFor(() => {
        expect(registerResult).toEqual({ error: 'Email already exists' });
      });
      expect(authService.login).not.toHaveBeenCalled();
    });

    it('calls login and sets user when registration succeeds', async () => {
      const mockUser = { $id: 'user-1', email: 'test@test.com' };
      authService.getCurrentUser
        .mockResolvedValueOnce({ error: 'No session' })
        .mockResolvedValueOnce(mockUser);
      authService.register.mockResolvedValue(mockUser);
      authService.login.mockResolvedValue({ userId: 'user-1' });

      const TestConsumerWithRegister = () => {
        const { user, register } = useAuth();
        return (
          <>
            <Text testID='user'>{user ? user.email : 'no-user'}</Text>
            <Pressable
              testID='register-trigger'
              onPress={() => register('test@test.com', 'password123')}
            >
              <Text>Register</Text>
            </Pressable>
          </>
        );
      };

      const { getByTestId } = render(
        <AuthProvider>
          <TestConsumerWithRegister />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(authService.getCurrentUser).toHaveBeenCalled();
      });

      fireEvent.press(getByTestId('register-trigger'));

      await waitFor(() => {
        expect(authService.register).toHaveBeenCalledWith(
          'test@test.com',
          'password123',
        );
      });

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith(
          'test@test.com',
          'password123',
        );
      });

      await waitFor(() => {
        expect(getByTestId('user')).toHaveTextContent('test@test.com');
      });
    });
  });

  describe('logout', () => {
    it('clears user and calls getCurrentUser', async () => {
      const mockUser = { $id: 'user-1', email: 'test@test.com' };
      authService.getCurrentUser
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValueOnce({ error: 'No session' });
      authService.logout.mockResolvedValue(undefined);

      const TestConsumerWithLogout = () => {
        const { user, logout } = useAuth();
        return (
          <>
            <Text testID='user'>{user ? user.email : 'no-user'}</Text>
            <Pressable testID='logout-trigger' onPress={() => logout()}>
              <Text>Logout</Text>
            </Pressable>
          </>
        );
      };

      const { getByTestId } = render(
        <AuthProvider>
          <TestConsumerWithLogout />
        </AuthProvider>,
      );

      await waitFor(() => {
        expect(getByTestId('user')).toHaveTextContent('test@test.com');
      });

      fireEvent.press(getByTestId('logout-trigger'));

      await waitFor(() => {
        expect(authService.logout).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(authService.getCurrentUser).toHaveBeenCalledTimes(2);
      });

      expect(getByTestId('user')).toHaveTextContent('no-user');
    });
  });
});
