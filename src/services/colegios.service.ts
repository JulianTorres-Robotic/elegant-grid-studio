// frontend/src/services/colegios.service.ts
import { fetchApi } from '../lib/apiClient';
import { Colegio } from '../types/models';

export const getColegios = () => {
  // El back debería exponer este endpoint
  return fetchApi<Colegio[]>('/colegios'); 
};

export const createColegio = (data: Partial<Colegio>) => {
  return fetchApi<Colegio>('/colegios', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};