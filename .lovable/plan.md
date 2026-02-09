

## Dashboard Corporativo — Neumorphism + Glassmorphism

### 🎨 Sistema de Diseño
- **Paleta de colores corporativos** integrada en variables CSS/Tailwind:
  - Azul primario (#0074BD), Rojo (#E30613), Gris oscuro (#878787), Gris claro (#D9DADB), Amarillo (#FFED00), Verde (#95C127), Negro, y variaciones con opacidad para glassmorphism
- **Neumorphism**: sombras suaves internas/externas en cards y botones sobre fondos claros
- **Glassmorphism**: fondos semi-transparentes con backdrop-blur en overlays, menú y perfil
- **Tema claro** como base (con posibilidad futura de dark mode)

### 🏗️ Layout Principal
- **Navbar superior fijo** con:
  - Logo/nombre de la app a la izquierda
  - Botón de menú hamburguesa (abre overlay lateral)
  - Icono de notificaciones (con badge de conteo, abre panel overlay)
  - Avatar del usuario (abre card de perfil overlay)
- **Área principal**: Grid responsive debajo del navbar

### 📋 Menú Overlay (lateral)
- Se abre como overlay con efecto glassmorphism sobre el contenido
- Opciones genéricas organizadas por secciones: Dashboard, Usuarios, Reportes, Configuración
- Las opciones visibles dependen del **rol** y **grupo** del usuario (lógica mock por ahora)
- Cada opción es clickeable y redirige a su ruta correspondiente
- Se cierra al hacer clic fuera o en un botón de cerrar

### 🔔 Panel de Notificaciones (overlay)
- Se abre desde el ícono en el navbar
- Lista de notificaciones mock con icono, título, descripción y timestamp
- Efecto glassmorphism
- Cada notificación es clickeable y redirige a una ruta

### 👤 Perfil de Usuario (overlay card)
- Se abre al pasar el mouse sobre el avatar en el navbar
- **Se cierra automáticamente cuando el mouse sale** del área del overlay
- Diseño tipo tarjeta de presentación con:
  - Avatar, nombre completo, correo electrónico
  - Rol y grupo del usuario
  - Botón para ver perfil completo / cerrar sesión (mock)
- Efecto neumorphism + glassmorphism

### 📊 Grid del Dashboard
- **Grid responsive** (CSS Grid via Tailwind) con cards que incluyen:
  - **KPIs**: Cards con número grande, label, icono y tendencia (↑↓)
  - **Gráficos**: Charts de línea, barras y pie usando Recharts
  - **Tablas de datos**: Tablas con datos mock, paginación simple
- Todas las cards con estilo neumorphism (sombras suaves, bordes redondeados)
- Grid adaptable: 1 columna en móvil, 2 en tablet, 3-4 en desktop

### 🔐 Sistema de Roles y Grupos (mock)
- **Roles**: superAdmin, Admin, User (almacenados en estado local con Zustand o Context)
- **Grupos**: IDP, TIC, OP (Operaciones), RE (Recepción)
- Un selector/toggle para cambiar de rol/grupo y ver cómo cambia el menú y el contenido (solo para pruebas)
- Sin conexión real al backend por ahora

### 📄 Páginas y Rutas
- `/` — Dashboard principal con grid
- `/users` — Página placeholder de gestión de usuarios
- `/reports` — Página placeholder de reportes
- `/settings` — Página placeholder de configuración
- `/profile` — Página de perfil completo
- Ruta 404 existente

### 🔧 Arquitectura
- Componentes reutilizables: NeuCard, GlassOverlay, KPICard, ChartCard, DataTableCard
- Estado global con React Context para rol/grupo del usuario actual
- Datos mock en archivos separados para fácil reemplazo futuro por API real

