import keycloak from '../auth/keycloak'; 

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'; // Usa proxy en local o la URL real en prod

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // 1. Obtenemos el token actual de Keycloak
  const token = keycloak.token;

  // 2. Preparamos los headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 3. Hacemos la petición
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 4. Manejo centralizado de errores
  if (!response.ok) {
    if (response.status === 401) {
      console.error('Sesión expirada o inválida');
      keycloak.login(); // Forzar login si el back rechaza el token
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error en la petición: ${response.status}`);
  }

  return response.json();
}