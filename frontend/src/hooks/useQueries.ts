import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Disease } from '../backend';

export function useGetAllDiseases() {
  const { actor, isFetching } = useActor();

  return useQuery<Disease[]>({
    queryKey: ['diseases'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDiseases();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetDisease(name: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Disease>({
    queryKey: ['disease', name],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDisease(name);
    },
    enabled: !!actor && !isFetching && !!name,
    staleTime: 5 * 60 * 1000,
  });
}

export function useInitialize() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.initialize();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diseases'] });
    },
  });
}
