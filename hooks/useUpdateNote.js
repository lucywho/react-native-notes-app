import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import noteService from '@/services/noteService';

export function useUpdateNote(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, text }) => {
      const response = await noteService.updateNote(id, text);
      if (response?.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes(userId) });
    },
  });
}
