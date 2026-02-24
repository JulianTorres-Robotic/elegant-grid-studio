# Guía Rápida de Git en VS Code

Esta guía te ayudará a entender y manejar los controles de código de VS Code que ves en tu pantalla.

## 1. ¿Qué significan las letras de colores?
*   **`A` (Verde - Added):** Archivo **Nuevo**. Git lo acaba de encontrar y aún no está guardado en el historial.
*   **`M` (Amarillo - Modified):** Archivo **Modificado**. Ya existía, pero tiene cambios sin guardar.
*   **`D` (Rojo - Deleted):** Archivo **Eliminado**.
*   **`U` (Untracked):** Archivo que Git no está rastreando aún (similar a Added pero sin estar en "stage").

## 2. Conceptos Básicos (La Analogía del Correo)
*   📥 **Fetch (Verificar):** Miras el buzón para ver si hay cartas, pero NO las sacas. (Actualiza información del remoto sin tocar tus archivos).
*   ⬇️ **Pull (Recibir):** Sacas las cartas del buzón y las lees. (Descarga cambios del servidor y actualiza tus archivos).
*   ⬆️ **Push (Enviar):** Echas tus cartas al buzón. (Sube tus cambios locales al servidor).

## 3. Pasos para Guardar Cambios (Interface Gráfica)

### Paso 1: Preparar (Stage)
1.  Ve a la lista de **Cambios**.
2.  Pasa el mouse sobre el título "Cambios" o sobre un archivo específico.
3.  Dale clic al signo **`+`**.
4.  *Los archivos subirán a "Cambios almacenados" (Staged Changes).*

### Paso 2: Mensaje y Confirmación (Commit)
1.  En el cuadro de texto de arriba, escribe un mensaje claro (Ej: `feat: estructura inicial del proyecto`).
2.  Dale clic al botón azul **Confirmación** (o al check ✔️).
3.  *Los archivos desaparecerán de la lista porque ya están guardados en tu PC.*

### Paso 3: Sincronizar (Push)
1.  Busca el botón azul **Sincronizar cambios** (o el ícono de flechas circulares en la barra inferior azul).
2.  Dale clic.
3.  *Esto enviará tus cambios a la nube (GitLab/GitHub).*

---
**Tip:** Si ves muchos archivos pendientes, revisa siempre qué vas a subir. ¡Es mejor hacer varios commits pequeños que uno gigante!
