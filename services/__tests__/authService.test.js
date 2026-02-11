import authService from '../authService';
import { account } from '../appwrite';

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registers successfully', async () => {
    const mockUser = { $id: 'user-1', email: 'test@test.com' };
    account.create.mockResolvedValue(mockUser);

    const result = await authService.register('test@test.com', 'password123');

    expect(result).toEqual(mockUser);
    expect(account.create).toHaveBeenCalled();
  });

  it('returns error on registration failure', async () => {
    account.create.mockRejectedValue(new Error('Email already exists'));

    const result = await authService.register('test@test.com', 'password123');

    expect(result).toHaveProperty('error');
    expect(result.error).toContain('Email already exists');
  });
});
