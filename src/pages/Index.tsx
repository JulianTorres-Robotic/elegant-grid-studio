import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICard from "@/components/dashboard/KPICard";
import ChartCard from "@/components/dashboard/ChartCard";
import DataTableCard from "@/components/dashboard/DataTableCard";
import RoleSwitcher from "@/components/dashboard/RoleSwitcher";
import { kpis } from "@/data/mockData";

const Index = () => (
  <DashboardLayout>
    {/* Role switcher for testing */}
    <RoleSwitcher />

    {/* KPIs Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
      <ChartCard type="line" />
      <ChartCard type="bar" />
    </div>

    {/* Table + Pie */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
      <div className="lg:col-span-2">
        <DataTableCard />
      </div>
      <ChartCard type="pie" />
    </div>
  </DashboardLayout>
);

export default Index;
