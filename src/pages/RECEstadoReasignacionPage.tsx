import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Search } from "lucide-react";
import { reasignacionesRegistro } from "@/data/moduleData";

const estadoBadgeClass = (estado: string) => {
  if (estado === "Completada") return "bg-success text-success-foreground";
  return "bg-warning text-warning-foreground";
};

const RECEstadoReasignacionPage = () => {
  const [busqueda, setBusqueda] = useState("");

  const filtered = reasignacionesRegistro.filter((r) =>
    r.id.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.cartilla.toLowerCase().includes(busqueda.toLowerCase()) ||
    r.ticket.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Recepción - Estado de Reasignaciones</h1>
        </div>

        <NeuCard className="p-5">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Label>Buscar por ID, cartilla o ticket</Label>
              <div className="flex gap-2">
                <Input placeholder="Ej: REAS-001, 1200002, TK-3001" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </NeuCard>

        <NeuCard className="p-5 overflow-x-auto">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Reasignaciones Registradas</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-semibold text-muted-foreground">ID</th>
                <th className="pb-3 font-semibold text-muted-foreground">Cartilla</th>
                <th className="pb-3 font-semibold text-muted-foreground">Colegio Anterior</th>
                <th className="pb-3 font-semibold text-muted-foreground">Colegio Final</th>
                <th className="pb-3 font-semibold text-muted-foreground">Ticket</th>
                <th className="pb-3 font-semibold text-muted-foreground">Fecha</th>
                <th className="pb-3 font-semibold text-muted-foreground">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-mono text-xs">{r.id}</td>
                  <td className="py-3 font-mono text-xs">{r.cartilla}</td>
                  <td className="py-3">{r.colegioAnterior}</td>
                  <td className="py-3 font-semibold text-primary">{r.colegioFinal}</td>
                  <td className="py-3 font-medium">{r.ticket}</td>
                  <td className="py-3 text-muted-foreground">{r.fecha}</td>
                  <td className="py-3"><Badge className={estadoBadgeClass(r.estado)}>{r.estado}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No se encontraron reasignaciones.</p>}
        </NeuCard>
      </div>
    </DashboardLayout>
  );
};

export default RECEstadoReasignacionPage;
