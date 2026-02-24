# Guía para Probar API con Postman (Keycloak Auth)

Como desarrollador Backend, tu mejor amigo hasta que el frontend esté listo será **Postman**. Ya que hemos protegido nuestras rutas con `protect` (Keycloak), no puedes simplemente hacer un `GET` en Postman; el sistema te dará `401 Unauthorized`. 

Necesitas un **Token JWT** para entrar. Aquí te explico cómo conseguirlo de forma automática en Postman.

---

## 1. Configurar Petición para Obtener el Token (Login)

Vamos a simular ser la pantalla de inicio de sesión, pero por terminal.

1. Abre **Postman** y crea un nuevo **Request** (Petición).
2. Pon el método en **`POST`**.
3. En la URL pon la ruta directa hacia el generador de tokens de tu Keycloak:
   `https://auth.roboticminds.ec/realms/Robotic Minds/protocol/openid-connect/token`

### Configurar los datos de envío (Body)
1. Debajo de la URL, selecciona la pestaña **`Body`**.
2. Marca la opción **`x-www-form-urlencoded`** (¡Muy importante!).
3. Agrega las siguientes llaves (Keys) y Valores (Values):

| Key | Value | Descripción |
| :--- | :--- | :--- |
| `grant_type` | `password` | Le decimos a Keycloak que nos loguearemos con clave |
| `client_id` | `gla-backend` | El ID de tu cliente confidencial |
| `client_secret` | `5LQDQe...` | Pega todo el Secret que tienes en tu `.env` |
| `username` | `test_admin` | El usuario de prueba que creamos |
| `password` | `12345` | La contraseña de ese usuario |

4. Presiona el botón azul **Send**.

### El Resultado Exitoso
Si todo está bien, Keycloak te responderá con un estado `200 OK` y un JSON grandote. Lo que te interesa es la propiedad que se llama **`access_token`**.
Tiene un valor larguísimo que empieza por `eyJhbGciOi...` 
**Copia todo ese texto larguísimo sin las comillas.**

---

## 2. Hacer Peticiones a tu API (Usando el Token)

Ahora que tienes tu "Pasaporte", vamos a pedirle la lista de robots a tu código Node.js.

1. Crea **otro Request** nuevo en Postman.
2. Pon el método en **`GET`**.
3. Pon la URL de tu API local: `http://localhost:3000/api/catalogo/robots` (o `tipos-suscripcion`).
4. Ve a la pestaña **`Auth`** (o `Authorization`) debajo de la barra de ruta.
5. En la lista desplegable **`Type`**, selecciona **`Bearer Token`**.
6. En la caja grande que dice **`Token`**, **pega el texto larguísimo** que copiaste en el paso anterior.
7. Presiona **Send**.

¡Pum! Tu backend validará la firma matemática del token contra Keycloak secretamente, y si es válido, te devolverá tu JSON con los datos de tu Base de Datos.

---

### Tip PRO (Variables Globales en Postman)
Tener que copiar y pegar el Token cada 5 minutos (porque expiran rápido) es molesto. Puedes automatizarlo:
1. En la petición donde consigues el token, ve a la pestaña **`Tests`**.
2. Pega este código JavaScript:
   ```javascript
   var jsonData = pm.response.json();
   pm.environment.set("mi_keycloak_token", jsonData.access_token);
   ```
3. Ahora, en las peticiones de tu API, en lugar de pegar el choclón de texto en `Bearer Token`, simplemente escribes: `{{mi_keycloak_token}}`.
4. ¡Postman rellenará el token solo cada vez que lo pidas!
