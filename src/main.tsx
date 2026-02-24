import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import keycloak from "./auth/keycloak";

// Inicializar Keycloak antes de renderizar nada
keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then((authenticated) => {
    if (authenticated) {
        console.log("✅ Usuario autenticado en Keycloak");
        // Una vez logueado, renderizamos la App
        createRoot(document.getElementById("root")!).render(<App />);
    } else {
        // Si falla o recarga sin token
        console.warn("❌ No autenticado");
        keycloak.login();
    }

}).catch(err => {
    console.error("❌ Fallo crítico al conectar con Keycloak:", err);
    // Mostrar pantalla de error (opcional)
    document.getElementById("root")!.innerHTML = "<h1>Error conectando a Sistema de Autenticación</h1>";
});