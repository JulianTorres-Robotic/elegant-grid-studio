import SidebarLayout from "@/components/dashboard/SidebarLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { useUser } from "@/contexts/UserContext";
import { Mail, Shield, Building2 } from "lucide-react";

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <SidebarLayout>
      <NeuCard className="max-w-lg mx-auto flex flex-col items-center gap-6 py-10">
        <div className="neu-card-sm w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-primary bg-primary/10">
          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-3 p-4 rounded-xl neu-inset">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Correo electrónico</p>
              <p className="text-sm font-medium text-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl neu-inset">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Rol</p>
              <p className="text-sm font-medium text-foreground">{user.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl neu-inset">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Grupo</p>
              <p className="text-sm font-medium text-foreground">{user.group}</p>
            </div>
          </div>
        </div>
      </NeuCard>
    </SidebarLayout>
  );
};

export default ProfilePage;
