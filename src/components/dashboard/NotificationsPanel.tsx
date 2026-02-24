import GlassOverlay from "./GlassOverlay";
import { notifications } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { UserPlus, FileText, Settings, Shield } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  UserPlus, FileText, Settings, Shield,
};

const NotificationsPanel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <GlassOverlay open={open} onClose={onClose} side="right" title="Notificaciones">
      <div className="flex flex-col gap-2">
        {notifications.map((notif) => {
          const Icon = iconMap[notif.icon] || FileText;
          return (
            <button
              key={notif.id}
              onClick={() => handleClick(notif.route)}
              className={`flex items-start gap-3 p-3 rounded-xl text-left transition-colors hover:bg-primary/10 ${!notif.read ? "bg-primary/5" : ""}`}
            >
              <div className="neu-card-sm p-2 rounded-lg shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{notif.title}</p>
                <p className="text-xs text-muted-foreground truncate">{notif.description}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{notif.timestamp}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
            </button>
          );
        })}
      </div>
    </GlassOverlay>
  );
};

export default NotificationsPanel;
