import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Construction } from "lucide-react";

const TICVerificacionPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Construction className="h-7 w-7 text-warning" />
          <h1 className="text-2xl font-bold text-foreground">TIC - Verificación de Reasignaciones</h1>
        </div>

        <NeuCard className="p-10 text-center max-w-lg mx-auto">
          <Construction className="h-16 w-16 text-warning mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Módulo en Desarrollo</h2>
          <p className="text-muted-foreground">
            Este módulo está actualmente en desarrollo. Pronto estará disponible para verificar el estado de las reasignaciones.
          </p>
        </NeuCard>
      </div>
    </DashboardLayout>
  );
};

export default TICVerificacionPage;
