// frontend/src/data/mockData.ts

export const kpis = [
  { id: 1, title: "Usuarios Activos", value: "0", change: "0%", trend: "up" },
  { id: 2, title: "Colegios Registrados", value: "0", change: "0%", trend: "up" },
  { id: 3, title: "Licencias", value: "0", change: "0%", trend: "neutral" }
];

// Arreglo para el ChartCard (asegura que tenga propiedades válidas)
export const chartData: Record<string, any[]> = {
  users: [{ name: "Ene", value: 0 }, { name: "Feb", value: 0 }],
  revenue: [{ name: "Ene", value: 0 }, { name: "Feb", value: 0 }],
  activity: [{ name: "Ene", value: 0 }, { name: "Feb", value: 0 }]
};

export const notifications = [
  { id: 1, title: "Sistema", message: "Conectando al backend...", time: "Ahora", type: "system", read: false }
];

export const recentUsers: any[] = [];