import Keycloak from 'keycloak-js';
import axios from 'axios';

// Configuración del cliente Frontend en Keycloak
const keycloakConfig = {
  url: 'https://auth.roboticminds.ec/',
  realm: 'Robotic Minds', // Debe coincidir con el nombre Name en View Realms
  clientId: 'gla-frontend' // El cliente público que configurarás en la UI
};

const keycloak = new Keycloak(keycloakConfig);

// Instancia global de Axios para llamadas a la API
export const api = axios.create({
  // Vite Proxy redirige /api al localhost:3000
  baseURL: '/api'
});

// Interceptor: Agrega el Token a cada petición si existe
api.interceptors.request.use((config) => {
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export default keycloak;
