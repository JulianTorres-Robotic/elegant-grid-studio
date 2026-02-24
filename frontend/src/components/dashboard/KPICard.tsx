import NeuCard from "./NeuCard";
import { TrendingUp, TrendingDown, Users, DollarSign, Ticket, ThumbsUp } from "lucide-react";
import type { KPI } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  Users, DollarSign, Ticket, ThumbsUp,
};

const KPICard = ({ kpi }: { kpi: KPI }) => {
  const Icon = iconMap[kpi.icon] || Users;
  const isPositive = kpi.change >= 0;

  return (
    <NeuCard className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="neu-card-sm p-3 rounded-xl">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {Math.abs(kpi.change)}%
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
        <p className="text-sm text-muted-foreground mt-1">{kpi.label}</p>
      </div>
    </NeuCard>
  );
};

export default KPICard;
