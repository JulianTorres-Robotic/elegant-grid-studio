import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Users } from "lucide-react";

const UsersPage = () => (
  <DashboardLayout>
    <NeuCard className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="neu-card-sm p-4 rounded-2xl">
        <Users className="h-10 w-10 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Gestión de Usuarios</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Aquí podrás administrar los usuarios del sistema, asignar roles y gestionar permisos por grupo.
      </p>
    </NeuCard>
  </DashboardLayout>
);

export default UsersPage;
