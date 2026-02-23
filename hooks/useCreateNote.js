import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import noteService from '@/services/noteService';

export function useCreateNote(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ text }) => {
      const response = await noteService.createNote(userId, text);
      if (response?.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes(userId) });
    },
  });
}
