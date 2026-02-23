import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import noteService from '@/services/noteService';

export function useReadNotes(userId) {
  return useQuery({
    queryKey: queryKeys.notes(userId),
    queryFn: async () => {
      const response = await noteService.getNotes(userId);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data ?? [];
    },
    enabled: !!userId,
  });
}
