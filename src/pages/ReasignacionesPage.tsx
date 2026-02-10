import { useState } from "react";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Search } from "lucide-react";
import { colegios, reasignacionesData } from "@/data/moduleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ReasignacionesPage = () => {
  const [rangoInicio, setRangoInicio] = useState("");
  const [rangoFin, setRangoFin] = useState("");
  const [colegio, setColegio] = useState("");

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Reasignaciones</h1>
        </div>

        {/* Filter form */}
        <NeuCard className="p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Filtro de Búsqueda</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <Label># Cartis (Desde)</Label>
              <Input placeholder="ID inicio" value={rangoInicio} onChange={(e) => setRangoInicio(e.target.value)} />
            </div>
            <div>
              <Label>Rango de ID (Hasta)</Label>
              <Input placeholder="ID fin" value={rangoFin} onChange={(e) => setRangoFin(e.target.value)} />
            </div>
            <div>
              <Label>Colegio</Label>
              <Select value={colegio} onValueChange={setColegio}>
                <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {colegios.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button className="gap-2">
              <Search className="h-4 w-4" /> Buscar
            </Button>
          </div>
        </NeuCard>

        {/* Chart */}
        <NeuCard className="p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Distribución de Reasignaciones por Colegio</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reasignacionesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="colegio" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--neu-shadow-sm)",
                  }}
                />
                <Legend />
                <Bar dataKey="asignadas" name="Asignadas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reasignadas" name="Reasignadas" fill="hsl(var(--corp-green))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </NeuCard>
      </div>
    </SidebarLayout>
  );
};

export default ReasignacionesPage;
