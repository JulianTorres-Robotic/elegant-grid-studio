import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import UsersPage from "./pages/UsersPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import IDPPedidosPage from "./pages/IDPPedidosPage";
import PerdidasPage from "./pages/PerdidasPage";
import ReasignacionesPage from "./pages/ReasignacionesPage";
import TICColegiosPage from "./pages/TICColegiosPage";
import LicenciasProfesoresPage from "./pages/LicenciasProfesoresPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/idp-pedidos" element={<IDPPedidosPage />} />
            <Route path="/perdidas" element={<PerdidasPage />} />
            <Route path="/reasignaciones" element={<ReasignacionesPage />} />
            <Route path="/tic-colegios" element={<TICColegiosPage />} />
            <Route path="/licencias-profesores" element={<LicenciasProfesoresPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
