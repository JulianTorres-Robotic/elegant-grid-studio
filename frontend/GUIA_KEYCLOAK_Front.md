## 2. Crear el Cliente (Para el Frontend)
Este paso es para configurar la seguridad en tu aplicación React/Vite. El frontend es un entorno público (el código se ejecuta en el navegador del usuario), por lo que la configuración es diferente a la del backend.

1.  En el menú lateral izquierdo, haz clic en **Clients**.
2.  Haz clic en el botón azul **Create client**.
3.  **Paso 1: General Settings**
    - **Client type:** Déjalo en `OpenID Connect`.
    - **Client ID:** Escribe `gla-frontend`.
    - **Name:** Gestor Licencias Frontend.
    - Haz clic en **Next**.
4.  **Paso 2: Capability config (¡IMPORTANTE!)**
    - **Client authentication:** **Apágalo (OFF)**. (Esto es vital. El frontend NUNCA debe tener un "Secret" porque los hackers podrían verlo en el código fuente).
    - **Authorization:** Apagado (OFF).
    - **Authentication flow:** Deja marcados `Standard flow` y `Direct access grants` (opcional).
    - Haz clic en **Next**.
5.  **Paso 3: Login settings (Conexión con tu App Local)**
    Aquí es donde le decimos a Keycloak "Permite que Vite se conecte y redirija al usuario tras el login".
    
    - **Root URL:** Déjalo en blanco.
    - **Home URL:** Déjalo en blanco.
    - **Valid redirect URIs:** Haz clic en "Add valid redirect URIs" y escribe:
        - `http://localhost:5173/*` (o `8080` si Vite levanta ahí, verifica tu terminal).
        *(Esto permite que Keycloak regrese al usuario a tu aplicación React después del login)*.
    - **Valid post logout redirect URIs:** Haz clic en el "+" y escribe:
        - `http://localhost:5173/*`
    - **Web origins:** Haz clic en el "+" y escribe:
        - `+` 
        *(El símbolo más significa "permite todos los orígenes que pusiste en Valid redirect URIs". Esto soluciona errores de CORS en el navegador).*
    
    - Haz clic en **Save**.

### 2.1. ¿Dónde está el Client Secret?
A diferencia del Backend, **¡AQUÍ NO HAY SECRET!**. Y eso es exactamente lo correcto. Tu código de frontend (React) usará solo el `gla-frontend` (Client ID) para comunicarse. Keycloak confiará en él gracias a que registraste `localhost` en los **Web origins** y **Redirect URIs**.
