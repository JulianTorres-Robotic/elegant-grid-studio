import GlassOverlay from "./GlassOverlay";
import { useUser } from "@/contexts/UserContext";
import { menuItems } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, BarChart3, Settings, Cog, ClipboardList,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Users, BarChart3, Settings, Cog, ClipboardList,
};

const MenuOverlay = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const visible = menuItems.filter(
    (item) => item.roles.includes(user.role) && item.groups.includes(user.group)
  );

  const sections = Array.from(new Set(visible.map((i) => i.section)));

  const handleClick = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <GlassOverlay open={open} onClose={onClose} title="Menú">
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {section}
            </p>
            <div className="flex flex-col gap-1">
              {visible.filter((i) => i.section === section).map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleClick(item.route)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors text-left"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Role/Group indicator */}
        <div className="mt-auto pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Rol: <span className="font-medium text-foreground">{user.role}</span> · Grupo: <span className="font-medium text-foreground">{user.group}</span>
          </p>
        </div>
      </div>
    </GlassOverlay>
  );
};

export default MenuOverlay;
