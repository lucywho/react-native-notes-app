import React from 'react';
import { HeaderLogout } from '../HeaderLogout';
import authService from '@/services/authService';
import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen, fireEvent, waitFor } from '@/test-utils';

jest.mock('@/services/authService');

const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), replace: mockReplace, back: jest.fn() }),
}));

describe('HeaderLogout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authService.getCurrentUser.mockResolvedValue({
      $id: 'user-1',
      email: 'test@test.com',
    });
    authService.logout.mockResolvedValue(undefined);
  });

  it('renders correctly when user is logged in', async () => {
    render(
      <AuthProvider>
        <HeaderLogout />
      </AuthProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeOnTheScreen();
    });
  });

  it('calls logout and navigates to home when Logout button is pressed', async () => {
    render(
      <AuthProvider>
        <HeaderLogout />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeOnTheScreen();
    });

    fireEvent.press(screen.getByText('Logout'));

    await waitFor(() => {
      expect(authService.logout).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/');
    });
  });
});
