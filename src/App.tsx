import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import IDPPedidosPage from "./pages/IDPPedidosPage";
import IDPEstadoPage from "./pages/IDPEstadoPage";
import IDPRobotsPage from "./pages/IDPRobotsPage";
import RECReasignacionPage from "./pages/RECReasignacionPage";
import RECPerdidaPresencialPage from "./pages/RECPerdidaPresencialPage";
import RECPerdidaVirtualPage from "./pages/RECPerdidaVirtualPage";
import OPColegiosPage from "./pages/OPColegiosPage";
import OPLicenciasProfesoresPage from "./pages/OPLicenciasProfesoresPage";
import OPEstadoPedidosPage from "./pages/OPEstadoPedidosPage";
import ProfilePage from "./pages/ProfilePage";
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
            {/* IDP */}
            <Route path="/idp-pedidos" element={<IDPPedidosPage />} />
            <Route path="/idp-estado" element={<IDPEstadoPage />} />
            <Route path="/idp-robots" element={<IDPRobotsPage />} />
            {/* Recepción */}
            <Route path="/rec-reasignacion" element={<RECReasignacionPage />} />
            <Route path="/rec-perdida-presencial" element={<RECPerdidaPresencialPage />} />
            <Route path="/rec-perdida-virtual" element={<RECPerdidaVirtualPage />} />
            {/* Operaciones */}
            <Route path="/op-colegios" element={<OPColegiosPage />} />
            <Route path="/op-licencias-profesores" element={<OPLicenciasProfesoresPage />} />
            <Route path="/op-estado-pedidos" element={<OPEstadoPedidosPage />} />
            {/* General */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
