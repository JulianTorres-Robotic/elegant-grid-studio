import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { BarChart3 } from "lucide-react";

const ReportsPage = () => (
  <DashboardLayout>
    <NeuCard className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="neu-card-sm p-4 rounded-2xl">
        <BarChart3 className="h-10 w-10 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Genera y visualiza reportes detallados sobre la actividad del sistema y métricas de rendimiento.
      </p>
    </NeuCard>
  </DashboardLayout>
);

export default ReportsPage;
