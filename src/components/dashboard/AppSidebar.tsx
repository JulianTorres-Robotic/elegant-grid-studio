import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  RefreshCw,
  School,
  GraduationCap,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { notifications } from "@/data/mockData";
import NotificationsPanel from "./NotificationsPanel";
import UserProfileCard from "./UserProfileCard";

const menuSections = [
  {
    title: "Principal",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, route: "/" },
    ],
  },
  {
    title: "IDP",
    items: [
      { label: "Pedidos de Licencia", icon: FileText, route: "/idp-pedidos" },
      { label: "Pérdidas y Recepción", icon: AlertTriangle, route: "/perdidas" },
      { label: "Reasignaciones", icon: RefreshCw, route: "/reasignaciones" },
    ],
  },
  {
    title: "Operaciones",
    items: [
      { label: "Gestión Colegios", icon: School, route: "/tic-colegios" },
      { label: "Licencias Profesores", icon: GraduationCap, route: "/licencias-profesores" },
    ],
  },
];

const AppSidebar = () => {
  const { user } = useUser();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300 bg-card border-r border-border ${
          collapsed ? "w-[68px]" : "w-60"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-3 border-b border-border">
          {!collapsed && (
            <h1 className="text-lg font-bold text-primary tracking-tight truncate">CorpDash</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors ml-auto"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {menuSections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="text-[11px] font-semibold uppercase text-muted-foreground px-2 mb-1.5 tracking-wider">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.route;
                  return (
                    <NavLink
                      key={item.route}
                      to={item.route}
                      end
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground/70 hover:bg-muted hover:text-foreground"
                      }`}
                      activeClassName=""
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer: notifications + user */}
        <div className="border-t border-border p-2 space-y-1">
          <button
            onClick={() => setNotifOpen(true)}
            className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-foreground/70 hover:bg-muted transition-colors relative"
          >
            <Bell className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Notificaciones</span>}
            {unreadCount > 0 && (
              <span className="absolute top-1 left-5 bg-destructive text-destructive-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <div
            className="relative"
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <button className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-foreground/70 hover:bg-muted transition-colors">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              {!collapsed && (
                <div className="text-left truncate">
                  <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground">{user.role}</p>
                </div>
              )}
            </button>
            {profileOpen && (
              <div className="absolute bottom-0 left-full ml-2 z-50">
                <UserProfileCard open={profileOpen} onClose={() => setProfileOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </aside>

      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
};

export default AppSidebar;
