import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import GlassOverlay from "@/components/dashboard/GlassOverlay";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardCheck, Search, Edit, RefreshCw, Layers } from "lucide-react";
import { pedidosLicencia, colegios, cartillas } from "@/data/moduleData";

const estadoBadgeClass = (estado: string) => {
  if (estado === "Aprobado") return "bg-success text-success-foreground";
  if (estado === "Pendiente") return "bg-warning text-warning-foreground";
  return "bg-destructive text-destructive-foreground";
};

const IDPEstadoPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [editOverlayOpen, setEditOverlayOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<string | null>(null);
  const [reasignacionTipo, setReasignacionTipo] = useState<"individual" | "masiva" | null>(null);

  const [cartillaIndividual, setCartillaIndividual] = useState("");
  const [colegioIndividual, setColegioIndividual] = useState("");
  const [rangoInicio, setRangoInicio] = useState("");
  const [rangoFin, setRangoFin] = useState("");
  const [colegioMasivo, setColegioMasivo] = useState("");

  const filtered = pedidosLicencia.filter((p) =>
    p.id.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.ticket.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEdit = (pedidoId: string) => {
    setSelectedPedido(pedidoId);
    setReasignacionTipo(null);
    setEditOverlayOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">IDP - Estado del Pedido</h1>
        </div>

        <NeuCard className="p-5">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Label>Buscar por Nº de Pedido o Ticket</Label>
              <div className="flex gap-2">
                <Input placeholder="Ej: PED-001 o TK-1001" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
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
                <th className="pb-3 font-semibold text-muted-foreground">Robot</th>
                <th className="pb-3 font-semibold text-muted-foreground">Cartilla</th>
                <th className="pb-3 font-semibold text-muted-foreground">Cant.</th>
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
                  <td className="py-3">{p.robot}</td>
                  <td className="py-3 font-mono text-xs">{p.cartilla}</td>
                  <td className="py-3 text-center">{p.cantidad}</td>
                  <td className="py-3">
                    <Badge className={estadoBadgeClass(p.estado)}>{p.estado}</Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{p.fecha}</td>
                  <td className="py-3">
                    <Button variant="ghost" size="sm" className="gap-1" disabled={p.estado !== "Aprobado"} onClick={() => handleEdit(p.id)}>
                      <Edit className="h-3.5 w-3.5" /> Editar
                    </Button>
                  </td>
                  <td className="py-3">
                    <Button variant="ghost" size="sm" className="gap-1" disabled={p.estado !== "Aprobado"} onClick={() => handleEdit(p.id)}>
                      <Edit className="h-3.5 w-3.5" /> Detalle
                    </Button>
                  </td>
                  <td className="py-3">
                    <Button variant="ghost" size="sm" className="gap-1" disabled={p.estado !== "Aprobado"} onClick={() => handleEdit(p.id)}>
                      <Edit className="h-3.5 w-3.5" /> Exportar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No se encontraron pedidos.</p>}
        </NeuCard>
      </div>

      <GlassOverlay open={editOverlayOpen} onClose={() => setEditOverlayOpen(false)} side="right" title={`Reasignación - ${selectedPedido}`}>
        {!reasignacionTipo ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">Seleccione el tipo de reasignación:</p>
            <NeuCard className="p-5 cursor-pointer hover:shadow-none transition-shadow" onClick={() => setReasignacionTipo("individual")}>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Reasignación Individual</p>
                  <p className="text-xs text-muted-foreground">Reasignar una cartilla específica</p>
                </div>
              </div>
            </NeuCard>
            <NeuCard className="p-5 cursor-pointer hover:shadow-none transition-shadow" onClick={() => setReasignacionTipo("masiva")}>
              <div className="flex items-center gap-3">
                <Layers className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Reasignación Múltiple / Masiva</p>
                  <p className="text-xs text-muted-foreground">Reasignar por rango de cartillas</p>
                </div>
              </div>
            </NeuCard>
          </div>
        ) : reasignacionTipo === "individual" ? (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setReasignacionTipo(null)} className="mb-2">← Volver</Button>
            <h3 className="font-semibold text-foreground">Reasignación Individual</h3>
            <div>
              <Label>Nº Cartilla</Label>
              <Select value={cartillaIndividual} onValueChange={setCartillaIndividual}>
                <SelectTrigger><SelectValue placeholder="Seleccionar cartilla" /></SelectTrigger>
                <SelectContent>{cartillas.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Colegio Destino</Label>
              <Select value={colegioIndividual} onValueChange={setColegioIndividual}>
                <SelectTrigger><SelectValue placeholder="Seleccionar colegio" /></SelectTrigger>
                <SelectContent>{colegios.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Button className="w-full">Confirmar Reasignación</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setReasignacionTipo(null)} className="mb-2">← Volver</Button>
            <h3 className="font-semibold text-foreground">Reasignación Masiva / Por Rango</h3>
            <div>
              <Label>Rango Inicio</Label>
              <Input placeholder="Ej: 1100001" value={rangoInicio} onChange={(e) => setRangoInicio(e.target.value)} />
            </div>
            <div>
              <Label>Rango Fin</Label>
              <Input placeholder="Ej: 1100010" value={rangoFin} onChange={(e) => setRangoFin(e.target.value)} />
            </div>
            <div>
              <Label>Colegio Destino</Label>
              <Select value={colegioMasivo} onValueChange={setColegioMasivo}>
                <SelectTrigger><SelectValue placeholder="Seleccionar colegio" /></SelectTrigger>
                <SelectContent>{colegios.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Button className="w-full">Confirmar Reasignación Masiva</Button>
          </div>
        )}
      </GlassOverlay>
    </DashboardLayout>
  );
};

export default IDPEstadoPage;
