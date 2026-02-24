## 2. Crear el Cliente (Para el Backend)
Este paso es para generar las credenciales que necesita tu código Node.js.

1.  En el menú lateral izquierdo, haz clic en **Clients**.
2.  Haz clic en el botón azul **Create client**.
3.  **Paso 1: General Settings**
    - **Client type:** Déjalo en `OpenID Connect`.
    - **Client ID:** Escribe `gla-backend`.
    - **Name:** Gestor Licencias.
    - Haz clic en **Next**.
4.  **Paso 2: Capability config (¡IMPORTANTE!)**
    - **Client authentication:** **Enciéndelo (ON)**. (Esto es vital, si no lo activas no tendrás Secret).
    - **Authorization:** Puedes encenderlo (ON) también.
    - **Authentication flow:** Deja marcados `Standard flow` y `Direct access grants`.
    - Haz clic en **Next**.
5.  **Paso 3: Login settings (Tu duda actual)**
    Aquí es donde le decimos a Keycloak "Confía en mi Frontend local".
    
    - **Root URL:** Déjalo en blanco.
    - **Home URL:** Déjalo en blanco.
    - **Valid redirect URIs:** Haz clic en "Add valid redirect URIs" y escribe:
        - `http://localhost:5173/*`
        *(Esto permite que Keycloak regrese al usuario a tu aplicación React después del login)*.
    - **Valid post logout redirect URIs:** Haz clic en el "+" y escribe:
        - `http://localhost:5173/*`
    - **Web origins:** Haz clic en el "+" y escribe:
        - `+` 
        *(El símbolo más significa "permite todos los orígenes que pusiste en Valid redirect URIs". Esto soluciona errores de CORS)*.
    
    - Haz clic en **Save**.

### 2.1. Copiar el Client Secret
Una vez guardado, te llevará a la pantalla de configuración del cliente `gla-backend`.
1.  Busca la pestaña **Credentials** (está arriba, junto a Settings, Keys, etc.).
2.  Verás un campo llamado **Client secret**.
3.  Haz clic en el icono de "copiar" (dos hojitas).
4.  Ve a tu archivo `backend/.env` y pégalo donde dice `KEYCLOAK_CLIENT_SECRET`.
