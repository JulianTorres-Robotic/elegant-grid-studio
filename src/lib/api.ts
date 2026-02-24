export const fetchAPI = async (
  endpoint: string, 
  token: string | undefined, 
  options: RequestInit = {}
) => {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  // Inyectamos el token de Keycloak para el backend
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // La petición va hacia Vite, y Vite la manda al Backend (localhost:3000)
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      console.error("Token de Keycloak expirado o inválido.");
      // Aquí podrías desencadenar un logout forzado o refresh token
    }
    throw new Error(`Error en la API: ${response.statusText}`);
  }

  return response.json();
};