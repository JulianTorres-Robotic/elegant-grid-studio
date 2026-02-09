import type { Role, Group } from "@/contexts/UserContext";

export interface KPI {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  route: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  section: string;
  roles: Role[];
  groups: Group[];
}

export interface TableRow {
  id: string;
  name: string;
  status: string;
  department: string;
  date: string;
  value: number;
}

export const kpis: KPI[] = [
  { id: "1", label: "Usuarios Activos", value: "1,247", change: 12.5, icon: "Users" },
  { id: "2", label: "Ingresos Mensuales", value: "$84,320", change: 8.2, icon: "DollarSign" },
  { id: "3", label: "Tickets Abiertos", value: "38", change: -5.1, icon: "Ticket" },
  { id: "4", label: "Satisfacción", value: "94.2%", change: 2.3, icon: "ThumbsUp" },
];

export const notifications: Notification[] = [
  { id: "1", title: "Nuevo usuario registrado", description: "Juan Pérez se ha registrado en el sistema", timestamp: "Hace 5 min", read: false, route: "/users", icon: "UserPlus" },
  { id: "2", title: "Reporte generado", description: "El reporte mensual de operaciones está listo", timestamp: "Hace 1 hora", read: false, route: "/reports", icon: "FileText" },
  { id: "3", title: "Actualización del sistema", description: "Se ha programado mantenimiento para las 22:00", timestamp: "Hace 3 horas", read: true, route: "/settings", icon: "Settings" },
  { id: "4", title: "Alerta de seguridad", description: "Se detectó un intento de acceso no autorizado", timestamp: "Hace 5 horas", read: true, route: "/settings", icon: "Shield" },
];

export const menuItems: MenuItem[] = [
  { id: "1", label: "Dashboard", icon: "LayoutDashboard", route: "/", section: "Principal", roles: ["superAdmin", "admin", "user"], groups: ["IDP", "TIC", "OP", "RE"] },
  { id: "2", label: "Usuarios", icon: "Users", route: "/users", section: "Gestión", roles: ["superAdmin", "admin"], groups: ["IDP", "TIC", "OP", "RE"] },
  { id: "3", label: "Reportes", icon: "BarChart3", route: "/reports", section: "Análisis", roles: ["superAdmin", "admin", "user"], groups: ["IDP", "TIC", "OP", "RE"] },
  { id: "4", label: "Configuración", icon: "Settings", route: "/settings", section: "Sistema", roles: ["superAdmin"], groups: ["IDP", "TIC"] },
  { id: "5", label: "Operaciones", icon: "Cog", route: "/reports", section: "Gestión", roles: ["superAdmin", "admin", "user"], groups: ["OP"] },
  { id: "6", label: "Recepción", icon: "ClipboardList", route: "/reports", section: "Gestión", roles: ["superAdmin", "admin", "user"], groups: ["RE"] },
];

export const tableData: TableRow[] = [
  { id: "1", name: "Proyecto Alpha", status: "Activo", department: "TIC", date: "2026-02-01", value: 15000 },
  { id: "2", name: "Migración DB", status: "En progreso", department: "IDP", date: "2026-01-28", value: 8500 },
  { id: "3", name: "Auditoría Q1", status: "Completado", department: "OP", date: "2026-01-15", value: 3200 },
  { id: "4", name: "Capacitación", status: "Pendiente", department: "RE", date: "2026-02-10", value: 1200 },
  { id: "5", name: "Infraestructura", status: "Activo", department: "TIC", date: "2026-02-05", value: 22000 },
  { id: "6", name: "Soporte N2", status: "En progreso", department: "OP", date: "2026-02-03", value: 4800 },
];

export const chartData = {
  line: [
    { month: "Ene", value: 4000, prev: 3200 },
    { month: "Feb", value: 3000, prev: 2800 },
    { month: "Mar", value: 5000, prev: 4100 },
    { month: "Abr", value: 4500, prev: 3900 },
    { month: "May", value: 6000, prev: 5200 },
    { month: "Jun", value: 5500, prev: 4800 },
  ],
  bar: [
    { name: "TIC", value: 45 },
    { name: "IDP", value: 32 },
    { name: "OP", value: 28 },
    { name: "RE", value: 15 },
  ],
  pie: [
    { name: "Completado", value: 45, fill: "hsl(204, 100%, 37%)" },
    { name: "En progreso", value: 30, fill: "hsl(88, 66%, 45%)" },
    { name: "Pendiente", value: 15, fill: "hsl(56, 100%, 50%)" },
    { name: "Cancelado", value: 10, fill: "hsl(356, 95%, 46%)" },
  ],
};
