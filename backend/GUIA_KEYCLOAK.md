# Guía de Configuración de Keycloak (Interfaz Nueva)

He detectado que usas la versión nueva de Keycloak. Sigue estos pasos exactos que coinciden con tu pantalla.

## 1. Seleccionar el Reino
Ya tienes creado y seleccionado el reino **`gla-backend`** (se ve en la esquina superior izquierda). **¡No te muevas de ahí!** Todos los pasos siguientes son dentro de ese reino.

---

## 2. Configuración de Clientes (Frontend vs Backend)

### ¿Por qué necesitamos DOS clientes?
Esta es una arquitectura de seguridad estándar:
1.  **Frontend (`gla-frontend`)**: Es un "Cliente Público". Vive en el navegador del usuario, por lo que **NO puede guardar secretos** (cualquiera podría verlos con F12). Usa PKCE para seguridad.
2.  **Backend (`gla-backend`)**: Es un "Cliente Confidencial" (o Solo Bearer). Vive en tu servidor, es seguro y sí puede tener secretos (`Client Secret`) para validar los tokens que le llegan.

### 2.1. Crear Cliente Backend (`gla-backend`)
Este es el que ya configuramos en el paso anterior (o en tu guía):
- **Client ID**: `gla-backend`
- **Access Type**: `Confidential` (o Authentication ON)
- **Valid Redirect URIs**: No necesita (o solo para pruebas locales).
- **Service Accounts Enabled**: ON (A veces útil para tareas de fondo).

### 2.2. Crear Cliente Frontend (`gla-frontend`)
Este es el nuevo que necesitamos para React/Vite:
1.  **Client ID**: `gla-frontend`
2.  **Client Authentication**: **OFF** (Apagado, esto es crítico).
3.  **Authentication Flow**: Standard Flow.
4.  **Valid Redirect URIs**: `http://localhost:5173/*` (y producción `https://...`)
5.  **Web Origins**: `+` (o `http://localhost:5173`)

> **Nota:** En el código Frontend (`keycloak-example.ts`), usarás `clientId: 'gla-frontend'`.

---

## 3. Roles y Grupos (Organización PRO)

### 3.1. Realm Roles (Roles Globales)
Crea estos roles en **Realm Roles** (no en el cliente):
- `admin`
- `idp_user`
- `recepcion_user`
- `tic_user`
- `operaciones_user`

### 3.2. Grupos (Departamentos)
En lugar de asignar roles persona por persona, crea **Grupos**:
1.  Menu **Groups** -> Create group `Departamento IDP`.
2.  Pestaña **Role mapping** del grupo -> Asignar rol `idp_user`.
3.  Menu **Users** -> Pestaña **Groups** -> Add to group `Departamento IDP`.

¡Así, cualquier usuario nuevo en IDP hereda los permisos automáticamente!

---

## 3. Crear Roles (Permisos)
Ahora definiremos qué "etiquetas" pueden tener tus usuarios.

1.  En el menú lateral izquierdo, haz clic en **Realm roles**.
2.  Haz clic en el botón azul **Create role**.
3.  **Role name:** Escribe `idp_user`.
4.  Haz clic en **Save**.
5.  Repite para crear estos otros roles:
    - `recepcion_user`
    - `tic_user`
    - `operaciones_user`
    - `admin`

---

## 4. Crear un Usuario de Prueba
1.  En el menú lateral izquierdo, haz clic en **Users**.
2.  Haz clic en **Add user** (o Create user).
3.  **Username:** `test_admin`.
    
    > **¿Qué significa cada campo?**
    > *   **Required user actions:** Si seleccionas algo aquí (ej: "Update Password"), Keycloak obligará al usuario a cambiar su contraseña o verificar su email la primera vez que inicie sesión. **Para pruebas, déjalo vacío**.
    > *   **Email verified:** Si lo activas (ON), Keycloak asume que el correo ya es real y válido. Si está apagado (OFF), podría pedir verificación si así lo configuras. **Puedes dejarlo en OFF**.
    > *   **Groups:** Permite meter al usuario en un "saco" (ej: "Empleados"). Si el grupo tiene roles asignados, el usuario los hereda. **Por ahora no lo usaremos, déjalo vacío**.
    
4.  Haz clic en **Create**.

### 4.1. Asignarle Contraseña
1.  Una vez creado, ve a la pestaña **Credentials** (arriba).
2.  Haz clic en **Set password**.
3.  Escribe una contraseña (ej: `12345`) en ambos campos.
4.  Desmarca la opción **Temporary** (para que no te pida cambiarla al entrar).
5.  Haz clic en **Save** -> **Save password**.

### 4.2. Asignarle Rol (¡Importante!)
1.  Ve a la pestaña **Role mapping**.
2.  Haz clic en el botón azul **Assign role**.
3.  **¡OJO AQUÍ!** Te saldrá un menú desplegable. Selecciona **Realm roles**.
    *   *¿Por qué?* Porque en el paso 3 creamos `admin`, `idp_user`, etc. como roles del Reino (Realm), no del cliente.
4.  Ahora sí, busca `admin` en la lista.
5.  Marca la casilla y dale a **Assign**.

### 4.3. Conceptos Clave (Para que entiendas tu sistema)

**A. ¿Por qué "Realm Roles" y no "Client Roles"?**
*   **Realm Role (Rol Global):** Es como un carnet de identidad que vale en todo el edificio (Reino). Si mañana creas otra app (ej: App Móvil), el rol `admin` del usuario le servirá allí también. **Es lo estándar y más fácil de mantener.**
*   **Client Role (Rol Local):** Es como una llave que solo abre la puerta de la oficina 301. Solo sirve para esta app específica. Es más complejo de gestionar si tu sistema crece.

**B. Grupos (La forma inteligente de gestionar departamentos)**
Como mencionaste que tienes varios usuarios en IDP, TIC, etc., **no deberías asignar roles uno por uno**. Lo mejor es usar **GRUPOS**.
*   Creas el grupo **"Departamento IDP"**.
*   A ese grupo le asignas el rol `idp_user`.
*   Metes a "Pepito", "Juan" y "Maria" en el grupo.
*   **¡Magia!** Todos heredan el permiso automáticamente.

**C. Logs y Auditoría (¿Quién hizo qué?)**
Keycloak tiene un sistema de "Eventos" para ver quién se loguea o falla contraseñas.
*   Menús: **Realm settings** (izquierda) -> Pestaña **Events** -> **User events settings** -> Activa **Save events** (ON).

---


### 4.4. Entendiendo la Lógica (¿Cómo funciona todo junto?)

Esta sección es vital para que entiendas la arquitectura de tu sistema **GLA**.

**A. Jerarquía de Poder (La Analogía del Edificio)**
Imagina que Keycloak es el sistema de seguridad de un edificio de oficinas.
1.  **Realm (Reino):** Es el Edificio entero (`gla-backend` o `RoboticMinds`).
2.  **Clients (Clientes):** Son las puertas de las oficinas.
    *   `gla-backend`: Es la puerta de tu sistema de Licencias.
    *   Si mañana creas otro sistema (ej: `Vex-Inventory`), crearás otro Cliente.
3.  **Roles (Etiquetas):** Son las tarjetas de acceso.
    *   `idp_user`: Tarjeta que dice "Permitido entrar a IDP".
    *   `tic_user`: Tarjeta que dice "Permitido entrar a TIC".
    *   *Nota: En Keycloak NO configuras las reglas (qué puede hacer el rol). Solo creas la etiqueta. Las reglas las programaremos en el Backend (Node.js).*
4.  **Groups (Departamentos):** Son grupos de personas.
    *   `Departamento IDP`: A este grupo le das la tarjeta `idp_user`.
    *   Cualquiera que entre al grupo, recibe la tarjeta automáticamente.
5.  **Users (Personas):** Pepito, Juan, María.

**B. Flujo de Comunicación (Frontend <-> Keycloak <-> Backend)**
¿Cómo viajan los datos cuando un usuario entra?

1.  **Frontend (React):** El usuario intenta entrar. React ve que no tiene sesión y lo manda a Keycloak.
2.  **Keycloak:** Le muestra la pantalla de Login. El usuario pone usuario/pass.
    *   Si es correcto, Keycloak le da un **TOKEN (JWT)** al Frontend.
    *   Este Token es como un pasaporte digital que dice: *"Soy Juan y tengo el rol `idp_user`"*.
3.  **Frontend (React):** Guarda ese Token y lo usa para hablar con el Backend.
    *   *"Hola Backend, dame la lista de Robots. Aquí está mi Token"*.
4.  **Backend (Node.js):** Recibe el pedido y revisa el Token.
    *   Valida la firma con el **Client Secret**.
    *   Lee los roles del Token.
    *   *Lógica de Código:* `if (roles.include('idp_user')) { return listaRobots } else { return AccesoDenegado }`

---



## 5. Configuración Avanzada: Grupos por Departamento (Recomendado)
Sigue estos pasos para organizar a tu personal como un PRO:

### Paso 5.1: Crear el Grupo
1.  Haz clic en **Groups** (menú izquierdo).
2.  Haz clic en **Create group**.
3.  Nombre: `Departamento IDP`.
4.  Haz clic en **Create**.

### Paso 5.2: Asignar Rol al Grupo
1.  Entra al grupo que acabas de crear (clic en su nombre).
2.  Ve a la pestaña **Role mapping**.
3.  Haz clic en **Assign role**.
4.  Selecciona **Filter by realm roles** y busca `idp_user`.
5.  Dale a **Assign**.
    *   *Ahora, cualquier persona que metas a este grupo tendrá permiso de IDP.*

### Paso 5.3: Meter Usuarios al Grupo
1.  Ve a **Users**.
2.  Entra en un usuario (ej: `juan.perez`).
3.  Ve a la pestaña **Groups**.
4.  Dale a **Join Group** y selecciona `Departamento IDP`.
5.  **Listo.**

> **¡NOTA MUY IMPORTANTE!**
> Al meter al usuario en el grupo, **YA TIENE EL PODER**.
> *   **NO** necesitas ir a la pestaña `Role mapping` de ese usuario individual.
> *   Keycloak le "presta" los roles del grupo automáticamente.
> *   Si en el futuro quieres quitarle permisos, solo lo sacas del grupo y listo. ¡Mucho más fácil!

---

## 6. Configuración Híbrida (Desarrollo + Producción)
¡Sí, puedes tener ambas configuraciones a la vez! Esto es ideal para probar en local sin romper el servidor real.

1.  Ve a **Clients** -> **gla-backend** -> **Settings**.
2.  En **Valid redirect URIs**, añade ambas líneas (haz clic en `Add valid redirect URIs`):
    *   `http://localhost:5173/*`
    *   `https://gla.roboticminds.ec/*`
3.  En **Valid post logout redirect URIs**, haz lo mismo:
    *   `http://localhost:5173/*`
    *   `https://gla.roboticminds.ec/*`
4.  En **Web origins**, asegúrate de que esté el `+`.

De esta forma, Keycloak aceptará logins tanto desde tu PC como desde el servidor web final.

---

## 7. Próximo Paso: Base de Datos
Tu configuración de Keycloak ya está **completa y lista para usarse**.

El siguiente paso lógico es crear las tablas en tu base de datos para que el sistema tenga dónde guardar la información.
1.  Verifica que `backend/.env` tenga:
    *   `KEYCLOAK_CLIENT_SECRET` (copiado de Credentials).
    *   `DATABASE_URL` (usuario y contraseña de MariaDB).
2.  Ejecuta en la terminal:
    `npx prisma migrate dev --name init`

---

## Resumen Final
Ahora tienes un sistema profesional:
1.  **Roles:** Definen "qué se puede hacer" (`idp_user`, `admin`).
2.  **Grupos:** Definen "quiénes somos" (`Departamento IDP`, `Departamento TIC`).
3.  **Usuarios:** Pertenecen a grupos y heredan sus poderes.

Tu `.env` del backend debe tener:
- `KEYCLOAK_REALM="gla-backend"`
- `KEYCLOAK_CLIENT_ID="gla-backend"`
- `KEYCLOAK_CLIENT_SECRET="...el código copiado..."`
