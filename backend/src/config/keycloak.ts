import Keycloak from 'keycloak-connect';
import session from 'express-session';

export const memoryStore = new session.MemoryStore();

export const keycloakConfig = {
    realm: process.env.KEYCLOAK_REALM || 'gla-realm',
    "auth-server-url": process.env.KEYCLOAK_AUTH_SERVER_URL || 'https://auth.roboticminds.ec/auth/',
    "ssl-required": "external",
    resource: process.env.KEYCLOAK_RESOURCE || 'gla-backend-client',
    "public-client": true,
    "confidential-port": 0
};

export const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
