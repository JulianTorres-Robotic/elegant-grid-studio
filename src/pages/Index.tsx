import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import DataTableCard from "@/components/dashboard/DataTableCard";
import RoleSwitcher from "@/components/dashboard/RoleSwitcher";
import { kpis, recentUsers } from "@/data/mockData";

const Index = () => {
  // Columnas para la tabla de Usuarios Recientes
  const columnsUsuariosRecientes = [
    { header: "Nombre", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Rol", accessorKey: "role" }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard General</h1>
          <p className="text-gray-500 text-sm mt-1">Resumen del sistema y métricas principales.</p>
        </div>
        <RoleSwitcher />
      </div>

      {/* Tarjetas de KPIs (Solucionado: Ahora enviamos la propiedad "kpi" completa) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {kpis.map((kpiData, i) => (
          <div key={kpiData.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
            <KPICard kpi={kpiData as any} />
          </div>
        ))}
      </div>

      {/* Gráficos y Tabla (Solucionado: Ahora usamos tipos de gráfico soportados) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          {/* Gráfico de línea */}
          <ChartCard type="line" />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          {/* Gráfico de barras */}
          <ChartCard type="bar" />
        </div>
        <div className="lg:col-span-3 h-[400px] animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <DataTableCard 
            title="Usuarios Recientes" 
            data={recentUsers} 
            columns={columnsUsuariosRecientes} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;