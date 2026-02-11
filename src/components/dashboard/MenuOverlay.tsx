import GlassOverlay from "./GlassOverlay";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FileText, ClipboardCheck, Bot,
  RefreshCw, AlertTriangle, Key,
  School, GraduationCap, ListChecks,
  LayoutDashboard,
} from "lucide-react";

interface MenuModule {
  label: string;
  icon: React.ElementType;
  route: string;
}

interface MenuGroup {
  title: string;
  modules: MenuModule[];
}

const menuGroups: MenuGroup[] = [
  {
    title: "IDP",
    modules: [
      { label: "Pedidos de Licencias", icon: FileText, route: "/idp-pedidos" },
      { label: "Estado del Pedido", icon: ClipboardCheck, route: "/idp-estado" },
      { label: "Carga de Robots", icon: Bot, route: "/idp-robots" },
    ],
  },
  {
    title: "Recepción",
    modules: [
      { label: "Reasignación", icon: RefreshCw, route: "/rec-reasignacion" },
      { label: "Pérdida Caso 1", icon: AlertTriangle, route: "/rec-perdida-presencial" },
      { label: "Pérdida Caso 2", icon: Key, route: "/rec-perdida-virtual" },
    ],
  },
  {
    title: "Operaciones",
    modules: [
      { label: "Carga de Colegios", icon: School, route: "/op-colegios" },
      { label: "Licencias Profesores", icon: GraduationCap, route: "/op-licencias-profesores" },
      { label: "Estado de Pedidos", icon: ListChecks, route: "/op-estado-pedidos" },
    ],
  },
];

const MenuOverlay = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <GlassOverlay open={open} onClose={onClose} title="Menú">
      <div className="flex flex-col gap-6">
        {/* Dashboard link */}
        <button
          onClick={() => handleClick("/")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
            location.pathname === "/" ? "bg-primary/15 text-primary font-semibold" : "hover:bg-primary/10"
          }`}
        >
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Dashboard</span>
        </button>

        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-2">
              {group.title}
            </p>
            <div className="flex flex-col gap-1">
              {group.modules.map((mod) => {
                const isActive = location.pathname === mod.route;
                return (
                  <button
                    key={mod.route}
                    onClick={() => handleClick(mod.route)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                      isActive ? "bg-primary/15 text-primary font-semibold" : "hover:bg-primary/10"
                    }`}
                  >
                    <mod.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{mod.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </GlassOverlay>
  );
};

export default MenuOverlay;
