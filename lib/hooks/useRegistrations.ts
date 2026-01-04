import { useQuery } from '@tanstack/react-query';
import { registrationsApi } from '@/lib/api/registrations';

// Query key factory
export const registrationKeys = {
  all: ['registrations'] as const,
  lists: () => [...registrationKeys.all, 'list'] as const,
};

export function useRegistrations() {
  return useQuery({
    queryKey: registrationKeys.lists(),
    queryFn: registrationsApi.list,
  });
}
