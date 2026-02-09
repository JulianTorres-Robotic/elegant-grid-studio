import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Settings } from "lucide-react";

const SettingsPage = () => (
  <DashboardLayout>
    <NeuCard className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="neu-card-sm p-4 rounded-2xl">
        <Settings className="h-10 w-10 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Administra la configuración del sistema, preferencias generales y parámetros avanzados.
      </p>
    </NeuCard>
  </DashboardLayout>
);

export default SettingsPage;
