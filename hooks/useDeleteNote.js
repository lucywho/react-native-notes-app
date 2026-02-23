import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import noteService from '@/services/noteService';

export function useDeleteNote(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await noteService.deleteNote(id);
      if (response?.error) throw new Error(response.error);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes(userId) });
    },
  });
}
