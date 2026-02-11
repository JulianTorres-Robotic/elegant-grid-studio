import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Bot, Construction } from "lucide-react";

const IDPRobotsPage = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bot className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">IDP - Carga de Robots</h1>
      </div>
      <NeuCard className="p-10 flex flex-col items-center justify-center text-center">
        <Construction className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Módulo en Desarrollo</h2>
        <p className="text-muted-foreground max-w-md">
          Este módulo aún no está definido. Próximamente se habilitará la funcionalidad de carga y gestión de robots.
        </p>
      </NeuCard>
    </div>
  </DashboardLayout>
);

export default IDPRobotsPage;
