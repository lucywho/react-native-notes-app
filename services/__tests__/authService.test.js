import authService from '../authService';
import { account } from '../appwrite';
import { ID } from 'react-native-appwrite';

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('registers successfully and returns user', async () => {
      const mockUser = { $id: 'user-1', email: 'test@test.com' };
      account.create.mockResolvedValue(mockUser);

      const result = await authService.register('test@test.com', 'password123');

      expect(result).toEqual(mockUser);
      expect(account.create).toHaveBeenCalledWith(
        'unique-id-123',
        'test@test.com',
        'password123',
      );
      expect(ID.unique).toHaveBeenCalled();
    });

    it('returns error on registration failure', async () => {
      account.create.mockRejectedValue(new Error('Email already exists'));

      const result = await authService.register('test@test.com', 'password123');

      expect(result).toHaveProperty('error');
      expect(result.error).toContain('Email already exists');
    });

    it('returns fallback error message when error has no message', async () => {
      account.create.mockRejectedValue({});

      const result = await authService.register('test@test.com', 'password123');

      expect(result).toHaveProperty('error');
      expect(result.error).toContain('Registration failed');
    });
  });

  describe('login', () => {
    it('logs in successfully and returns session', async () => {
      const mockSession = { userId: 'user-1' };
      account.createEmailPasswordSession.mockResolvedValue(mockSession);

      const result = await authService.login('test@test.com', 'password123');

      expect(result).toEqual(mockSession);
      expect(account.createEmailPasswordSession).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password123',
      });
    });

    it('returns error on login failure', async () => {
      account.createEmailPasswordSession.mockRejectedValue(
        new Error('Invalid credentials'),
      );

      const result = await authService.login('test@test.com', 'wrongpassword');

      expect(result).toHaveProperty('error');
      expect(result.error).toContain('Invalid credentials');
    });
  });

  describe('getCurrentUser', () => {
    it('returns user when session exists', async () => {
      const mockUser = { $id: 'user-1', email: 'test@test.com' };
      account.get.mockResolvedValue(mockUser);

      const result = await authService.getCurrentUser();

      expect(result).toEqual(mockUser);
      expect(account.get).toHaveBeenCalled();
    });

    it('returns error when no session', async () => {
      account.get.mockRejectedValue(new Error('Unauthorized'));

      const result = await authService.getCurrentUser();

      expect(result).toHaveProperty('error');
      expect(result.error).toBe('Unauthorized');
    });

    it('returns fallback error when error has no message', async () => {
      account.get.mockRejectedValue({});

      const result = await authService.getCurrentUser();

      expect(result).toHaveProperty('error');
      expect(result.error).toContain('Failed to get current user');
    });
  });

  describe('logout', () => {
    it('logs out successfully', async () => {
      account.deleteSessions.mockResolvedValue(undefined);

      const result = await authService.logout();

      expect(result).toEqual({ success: true });
      expect(account.deleteSessions).toHaveBeenCalledWith('current');
    });

    it('returns error on logout failure', async () => {
      account.deleteSessions.mockRejectedValue(new Error('Network error'));

      const result = await authService.logout();

      expect(result).toHaveProperty('error');
      expect(result.error).toContain('Network error');
    });
  });
});
