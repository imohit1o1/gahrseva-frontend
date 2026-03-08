import { useQuery } from '@tanstack/react-query';
import { api } from '../api/interceptor';
import { ENDPOINTS } from '../api/endpoints';
import type { HealthResponse } from '../types/health';


export const useHealth = () =>
  useQuery({
    queryKey: [ENDPOINTS.HEALTH],
    queryFn: () => api.get<HealthResponse>(ENDPOINTS.HEALTH),
  });