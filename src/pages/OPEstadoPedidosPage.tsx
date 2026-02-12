import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GlassOverlay from "@/components/dashboard/GlassOverlay";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ListChecks, Search, Edit, Eye } from "lucide-react";
import { pedidosProfesores, type PedidoProfesor } from "@/data/moduleData";

const estadoBadgeClass = (estado: string) => {
  if (estado === "Aprobado") return "bg-success text-success-foreground";
  if (estado === "Pendiente") return "bg-warning text-warning-foreground";
  return "bg-destructive text-destructive-foreground";
};

const OPEstadoPedidosPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<PedidoProfesor | null>(null);

  const filtered = pedidosProfesores.filter((p) =>
    p.id.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.ticket.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.colegio.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleDetalle = (pedido: PedidoProfesor) => {
    setSelectedPedido(pedido);
    setDetalleOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ListChecks className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">OP - Estado de Pedidos Profesores</h1>
        </div>

        <NeuCard className="p-5">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Label>Buscar por pedido, ticket o colegio</Label>
              <div className="flex gap-2">
                <Input placeholder="Ej: PROF-001, TK-5501 o Colegio..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </NeuCard>

        <NeuCard className="p-5 overflow-x-auto">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Pedidos Registrados</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-semibold text-muted-foreground">ID</th>
                <th className="pb-3 font-semibold text-muted-foreground">Ticket</th>
                <th className="pb-3 font-semibold text-muted-foreground">Colegio</th>
                <th className="pb-3 font-semibold text-muted-foreground">Cant. Lic.</th>
                <th className="pb-3 font-semibold text-muted-foreground">Estado</th>
                <th className="pb-3 font-semibold text-muted-foreground">Fecha</th>
                <th className="pb-3 font-semibold text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-mono text-xs">{p.id}</td>
                  <td className="py-3 font-medium">{p.ticket}</td>
                  <td className="py-3">{p.colegio}</td>
                  <td className="py-3 text-center">{p.cantidadLicencias}</td>
                  <td className="py-3">
                    <Badge className={estadoBadgeClass(p.estado)}>{p.estado}</Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{p.fecha}</td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="gap-1" disabled={p.estado !== "Aprobado"}>
                        <Edit className="h-3.5 w-3.5" /> Editar
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => handleDetalle(p)}>
                        <Eye className="h-3.5 w-3.5" /> Detalle
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No se encontraron pedidos.</p>}
        </NeuCard>
      </div>

      <GlassOverlay open={detalleOpen} onClose={() => setDetalleOpen(false)} side="right" title={`Detalle - ${selectedPedido?.id}`}>
        {selectedPedido && (
          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Ticket:</span><span className="font-medium">{selectedPedido.ticket}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Colegio:</span><span className="font-medium">{selectedPedido.colegio}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Cantidad:</span><span className="font-medium">{selectedPedido.cantidadLicencias}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Estado:</span><Badge className={estadoBadgeClass(selectedPedido.estado)}>{selectedPedido.estado}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Fecha:</span><span>{selectedPedido.fecha}</span></div>
            </div>

            {selectedPedido.licenciasCreadas && selectedPedido.licenciasCreadas.length > 0 && (
              <NeuCard className="p-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Licencias Creadas (PRRD)</h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedPedido.licenciasCreadas.map((lic) => (
                    <div key={lic} className="font-mono text-xs bg-primary/10 text-primary px-3 py-2 rounded-lg text-center">
                      {lic}
                    </div>
                  ))}
                </div>
              </NeuCard>
            )}

            {(!selectedPedido.licenciasCreadas || selectedPedido.licenciasCreadas.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">No hay licencias creadas para este pedido.</p>
            )}
          </div>
        )}
      </GlassOverlay>
    </DashboardLayout>
  );
};

export default OPEstadoPedidosPage;
