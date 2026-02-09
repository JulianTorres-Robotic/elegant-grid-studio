import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const UserProfileCard = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-72 glass-strong rounded-2xl shadow-neu animate-scale-in z-50 p-5">
      <div className="flex flex-col items-center gap-3">
        {/* Avatar */}
        <div className="neu-card-sm w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-primary bg-primary/10">
          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>

        <div className="text-center">
          <p className="font-semibold text-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <div className="flex gap-2">
          <span className="px-2 py-1 rounded-lg bg-primary/15 text-primary text-xs font-medium">{user.role}</span>
          <span className="px-2 py-1 rounded-lg bg-accent/15 text-accent text-xs font-medium">{user.group}</span>
        </div>

        <div className="w-full border-t border-border/30 pt-3 flex flex-col gap-1">
          <button
            onClick={() => { navigate("/profile"); onClose(); }}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-primary/10 transition-colors text-sm text-foreground"
          >
            <User className="h-4 w-4" /> Ver perfil completo
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl hover:bg-destructive/10 transition-colors text-sm text-destructive"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
