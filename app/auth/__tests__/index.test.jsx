import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import AuthScreen from '../index';

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('AuthScreen', () => {
  const mockLogin = jest.fn();
  const mockRegister = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({ login: mockLogin, register: mockRegister });
    useRouter.mockReturnValue({
      push: jest.fn(),
      replace: mockReplace,
      back: jest.fn(),
    });
  });

  describe('form validation', () => {
    it('shows error when email and password are empty', async () => {
      render(<AuthScreen />);

      fireEvent.press(screen.getByTestId('auth-submit-button'));

      expect(screen.getByText('Please enter your email and password')).toBeOnTheScreen();
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('shows error when only email is entered', async () => {
      render(<AuthScreen />);

      fireEvent.changeText(screen.getByTestId('auth-email-input'), 'test@test.com');
      fireEvent.press(screen.getByTestId('auth-submit-button'));

      expect(screen.getByText('Please enter your email and password')).toBeOnTheScreen();
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('shows error when only password is entered', async () => {
      render(<AuthScreen />);

      fireEvent.changeText(screen.getByTestId('auth-password-input'), 'password123');
      fireEvent.press(screen.getByTestId('auth-submit-button'));

      expect(screen.getByText('Please enter your email and password')).toBeOnTheScreen();
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('shows error when email is whitespace only', async () => {
      render(<AuthScreen />);

      fireEvent.changeText(screen.getByTestId('auth-email-input'), '   ');
      fireEvent.changeText(screen.getByTestId('auth-password-input'), 'password123');
      fireEvent.press(screen.getByTestId('auth-submit-button'));

      expect(screen.getByText('Please enter your email and password')).toBeOnTheScreen();
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('shows error when passwords do not match in register mode', async () => {
      render(<AuthScreen />);

      fireEvent.press(screen.getByTestId('auth-toggle-mode'));
      fireEvent.changeText(screen.getByTestId('auth-email-input'), 'test@test.com');
      fireEvent.changeText(screen.getByTestId('auth-password-input'), 'password123');
      fireEvent.changeText(screen.getByTestId('auth-confirm-password-input'), 'different');
      fireEvent.press(screen.getByTestId('auth-submit-button'));

      expect(screen.getByText('Passwords do not match')).toBeOnTheScreen();
      expect(mockRegister).not.toHaveBeenCalled();
    });
  });

  describe('login flow', () => {
    it('calls login and navigates to notes on success', async () => {
      mockLogin.mockResolvedValue({ success: true });

      render(<AuthScreen />);

      fireEvent.changeText(screen.getByTestId('auth-email-input'), 'test@test.com');
      fireEvent.changeText(screen.getByTestId('auth-password-input'), 'password123');
      fireEvent.press(screen.getByTestId('auth-submit-button'));

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123');
      });
      expect(mockReplace).toHaveBeenCalledWith('/notes');
    });

    it('shows Alert and does not navigate on login failure', async () => {
      mockLogin.mockResolvedValue({ error: 'Invalid credentials' });

      render(<AuthScreen />);

      fireEvent.changeText(screen.getByTestId('auth-email-input'), 'test@test.com');
      fireEvent.changeText(screen.getByTestId('auth-password-input'), 'password123');
      fireEvent.press(screen.getByTestId('auth-submit-button'));

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Error: ', 'Invalid credentials');
      });
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe('register flow', () => {
    it('calls register and navigates to notes on success', async () => {
      mockRegister.mockResolvedValue({ success: true });

      render(<AuthScreen />);

      fireEvent.press(screen.getByTestId('auth-toggle-mode'));
      fireEvent.changeText(screen.getByTestId('auth-email-input'), 'test@test.com');
      fireEvent.changeText(screen.getByTestId('auth-password-input'), 'password123');
      fireEvent.changeText(screen.getByTestId('auth-confirm-password-input'), 'password123');
      fireEvent.press(screen.getByTestId('auth-submit-button'));

      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith('test@test.com', 'password123');
      });
      expect(mockReplace).toHaveBeenCalledWith('/notes');
    });

    it('shows Alert and does not navigate on register failure', async () => {
      mockRegister.mockResolvedValue({ error: 'Email already exists' });

      render(<AuthScreen />);

      fireEvent.press(screen.getByTestId('auth-toggle-mode'));
      fireEvent.changeText(screen.getByTestId('auth-email-input'), 'test@test.com');
      fireEvent.changeText(screen.getByTestId('auth-password-input'), 'password123');
      fireEvent.changeText(screen.getByTestId('auth-confirm-password-input'), 'password123');
      fireEvent.press(screen.getByTestId('auth-submit-button'));

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Error: ', 'Email already exists');
      });
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe('mode toggle', () => {
    it('shows Login title and Sign Up link by default', () => {
      render(<AuthScreen />);

      expect(screen.getByTestId('auth-title')).toHaveTextContent('Login');
      expect(screen.getByText('Sign Up')).toBeOnTheScreen();
      expect(screen.queryByTestId('auth-confirm-password-input')).toBeNull();
    });

    it('switches to Sign Up mode with confirm password field', () => {
      render(<AuthScreen />);

      fireEvent.press(screen.getByTestId('auth-toggle-mode'));

      expect(screen.getByTestId('auth-title')).toHaveTextContent('Sign Up');
      expect(screen.getByText('Login')).toBeOnTheScreen();
      expect(screen.getByTestId('auth-confirm-password-input')).toBeOnTheScreen();
    });

    it('switches back to Login mode when toggled again', () => {
      render(<AuthScreen />);

      fireEvent.press(screen.getByTestId('auth-toggle-mode'));
      fireEvent.press(screen.getByTestId('auth-toggle-mode'));

      expect(screen.getByTestId('auth-title')).toHaveTextContent('Login');
      expect(screen.queryByTestId('auth-confirm-password-input')).toBeNull();
    });
  });
});
