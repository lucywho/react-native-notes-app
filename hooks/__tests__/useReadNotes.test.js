import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReadNotes } from '../useReadNotes';
import noteService from '@/services/noteService';

jest.mock('@/services/noteService');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe('useReadNotes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches notes when userId is provided', async () => {
    const mockNotes = [
      { $id: 'note-1', text: 'First note' },
      { $id: 'note-2', text: 'Second note' },
    ];
    noteService.getNotes.mockResolvedValue({ data: mockNotes, error: null });

    const { result } = renderHook(() => useReadNotes('user-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockNotes);
    expect(noteService.getNotes).toHaveBeenCalledWith('user-1');
  });

  it('does not fetch when userId is undefined', () => {
    renderHook(() => useReadNotes(undefined), {
      wrapper: createWrapper(),
    });

    expect(noteService.getNotes).not.toHaveBeenCalled();
  });

  it('sets error state when service returns error', async () => {
    noteService.getNotes.mockResolvedValue({
      error: 'Network error',
      data: undefined,
    });

    const { result } = renderHook(() => useReadNotes('user-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Network error');
  });

  it('returns empty array when service returns empty data', async () => {
    noteService.getNotes.mockResolvedValue({ data: [], error: null });

    const { result } = renderHook(() => useReadNotes('user-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });
});
