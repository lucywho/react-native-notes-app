import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateNote } from '../useCreateNote';
import noteService from '@/services/noteService';

jest.mock('@/services/noteService');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { gcTime: Infinity },
      mutations: { gcTime: Infinity },
    },
  });
  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe('useCreateNote', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls noteService.createNote and invalidates notes query on success', async () => {
    const mockNote = { $id: 'note-1', text: 'New note', user_id: 'user-1' };
    noteService.createNote.mockResolvedValue({ data: mockNote });

    const { result } = renderHook(() => useCreateNote('user-1'), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ text: 'New note' });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(noteService.createNote).toHaveBeenCalledWith('user-1', 'New note');
    expect(result.current.data).toEqual(mockNote);
  });

  it('throws when service returns error', async () => {
    noteService.createNote.mockResolvedValue({ error: 'Permission denied' });

    const { result } = renderHook(() => useCreateNote('user-1'), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ text: 'New note' });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Permission denied');
  });
});
