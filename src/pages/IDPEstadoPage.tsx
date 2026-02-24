import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import GlassOverlay from "@/components/dashboard/GlassOverlay";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardCheck, Search, Edit, Eye, Download, RefreshCw, Layers, Plus, X, Users } from "lucide-react";
import { pedidosLicencia, colegios, cartillas, type PedidoLicencia } from "@/data/moduleData";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

const estadoBadgeClass = (estado: string) => {
  if (estado === "Aprobado") return "bg-success text-success-foreground";
  if (estado === "Pendiente") return "bg-warning text-warning-foreground";
  return "bg-destructive text-destructive-foreground";
};

const SearchableSelect = ({
  value, onValueChange, placeholder, options,
}: { value: string; onValueChange: (v: string) => void; placeholder: string; options: string[] }) => {
  const [search, setSearch] = useState("");
  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>
        <div className="px-2 pb-2">
          <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 text-sm" onClick={(e) => e.stopPropagation()} />
        </div>
        {filtered.length === 0 && <p className="text-sm text-muted-foreground px-3 py-2">Sin resultados</p>}
        {filtered.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
};

interface IndividualReasignacion {
  id: number;
  cartilla: string;
  colegio: string;
}

const IDPEstadoPage = () => {
  const { toast } = useToast();
  const [busqueda, setBusqueda] = useState("");
  const [editOverlayOpen, setEditOverlayOpen] = useState(false);
  const [detalleOverlayOpen, setDetalleOverlayOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<PedidoLicencia | null>(null);
  const [reasignacionTipo, setReasignacionTipo] = useState<"individual" | "masiva" | "rango" | null>(null);

  // Individual
  const [cartillaIndividual, setCartillaIndividual] = useState("");
  const [colegioIndividual, setColegioIndividual] = useState("");

  // Masiva (multiple individuals)
  const [masivaItems, setMasivaItems] = useState<IndividualReasignacion[]>([{ id: 1, cartilla: "", colegio: "" }]);

  // Rango
  const [rangoInicio, setRangoInicio] = useState("");
  const [rangoFin, setRangoFin] = useState("");
  const [colegioRango, setColegioRango] = useState("");

  const filtered = pedidosLicencia.filter((p) =>
    p.id.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.ticket.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEdit = (pedido: PedidoLicencia) => {
    setSelectedPedido(pedido);
    setReasignacionTipo(null);
    setEditOverlayOpen(true);
  };

  const handleDetalle = (pedido: PedidoLicencia) => {
    setSelectedPedido(pedido);
    setDetalleOverlayOpen(true);
  };

  const handleExport = (pedido: PedidoLicencia) => {
    const ws = XLSX.utils.json_to_sheet([{
      ID: pedido.id,
      Ticket: pedido.ticket,
      Colegio: pedido.colegio,
      Robot: pedido.robot,
      "Tipo Cartilla": pedido.tipoCartilla,
      "Nº Cartilla": pedido.cartilla,
      Cantidad: pedido.cantidad,
      Estado: pedido.estado,
      Fecha: pedido.fecha,
    }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedido");
    XLSX.writeFile(wb, `${pedido.id}.xlsx`);
    toast({ title: "Exportado", description: `${pedido.id} exportado a .xlsx` });
  };

  const addMasivaItem = () => {
    setMasivaItems((prev) => [...prev, { id: Date.now(), cartilla: "", colegio: "" }]);
  };

  const removeMasivaItem = (id: number) => {
    if (masivaItems.length === 1) return;
    setMasivaItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateMasivaItem = (id: number, field: "cartilla" | "colegio", value: string) => {
    setMasivaItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleConfirmReasignacion = () => {
    toast({ title: "Reasignación confirmada", description: "La reasignación se procesó correctamente." });
    setEditOverlayOpen(false);
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
                <th className="pb-3 font-semibold text-muted-foreground">Tipo</th>
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
                  <td className="py-3 font-mono text-xs">{p.tipoCartilla}</td>
                  <td className="py-3 font-mono text-xs">{p.cartilla}</td>
                  <td className="py-3 text-center">{p.cantidad}</td>
                  <td className="py-3">
                    <Badge className={estadoBadgeClass(p.estado)}>{p.estado}</Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{p.fecha}</td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="gap-1" disabled={p.estado !== "Aprobado"} onClick={() => handleEdit(p)}>
                        <Edit className="h-3.5 w-3.5" /> Editar
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => handleDetalle(p)}>
                        <Eye className="h-3.5 w-3.5" /> Detalle
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => handleExport(p)}>
                        <Download className="h-3.5 w-3.5" /> Exportar
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

      {/* Detalle Overlay */}
      <GlassOverlay open={detalleOverlayOpen} onClose={() => setDetalleOverlayOpen(false)} side="right" title={`Detalle - ${selectedPedido?.id}`}>
        {selectedPedido && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">ID:</span><span className="font-mono font-medium">{selectedPedido.id}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Ticket:</span><span className="font-medium">{selectedPedido.ticket}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Colegio:</span><span>{selectedPedido.colegio}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Robot:</span><span>{selectedPedido.robot}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tipo Cartilla:</span><span className="font-mono">{selectedPedido.tipoCartilla}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Nº Cartilla:</span><span className="font-mono">{selectedPedido.cartilla}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Cantidad:</span><span>{selectedPedido.cantidad}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Estado:</span><Badge className={estadoBadgeClass(selectedPedido.estado)}>{selectedPedido.estado}</Badge></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Fecha:</span><span>{selectedPedido.fecha}</span></div>
          </div>
        )}
      </GlassOverlay>

      {/* Edit/Reasignación Overlay */}
      <GlassOverlay open={editOverlayOpen} onClose={() => setEditOverlayOpen(false)} side="right" title={`Reasignación - ${selectedPedido?.id}`}>
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
            <NeuCard className="p-5 cursor-pointer hover:shadow-none transition-shadow" onClick={() => { setReasignacionTipo("masiva"); setMasivaItems([{ id: 1, cartilla: "", colegio: "" }]); }}>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Reasignación Masiva</p>
                  <p className="text-xs text-muted-foreground">Múltiples reasignaciones individuales en una sola operación</p>
                </div>
              </div>
            </NeuCard>
            <NeuCard className="p-5 cursor-pointer hover:shadow-none transition-shadow" onClick={() => setReasignacionTipo("rango")}>
              <div className="flex items-center gap-3">
                <Layers className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Reasignación por Rango</p>
                  <p className="text-xs text-muted-foreground">Reasignar un rango continuo de cartillas</p>
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
              <SearchableSelect value={cartillaIndividual} onValueChange={setCartillaIndividual} placeholder="Seleccionar cartilla" options={cartillas} />
            </div>
            <div>
              <Label>Colegio Destino</Label>
              <SearchableSelect value={colegioIndividual} onValueChange={setColegioIndividual} placeholder="Seleccionar colegio" options={colegios} />
            </div>
            <Button className="w-full" onClick={handleConfirmReasignacion}>Confirmar Reasignación</Button>
          </div>
        ) : reasignacionTipo === "masiva" ? (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setReasignacionTipo(null)} className="mb-2">← Volver</Button>
            <h3 className="font-semibold text-foreground">Reasignación Masiva</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {masivaItems.map((item, idx) => (
                <NeuCard key={item.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">#{idx + 1}</span>
                    {masivaItems.length > 1 && (
                      <button onClick={() => removeMasivaItem(item.id)} className="text-muted-foreground hover:text-destructive"><X className="h-3.5 w-3.5" /></button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs">Nº Cartilla</Label>
                      <SearchableSelect value={item.cartilla} onValueChange={(v) => updateMasivaItem(item.id, "cartilla", v)} placeholder="Cartilla" options={cartillas} />
                    </div>
                    <div>
                      <Label className="text-xs">Colegio Destino</Label>
                      <SearchableSelect value={item.colegio} onValueChange={(v) => updateMasivaItem(item.id, "colegio", v)} placeholder="Colegio" options={colegios} />
                    </div>
                  </div>
                </NeuCard>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addMasivaItem} className="gap-1 w-full">
              <Plus className="h-3.5 w-3.5" /> Agregar otra reasignación
            </Button>
            <Button className="w-full" onClick={handleConfirmReasignacion}>Confirmar Reasignación Masiva</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setReasignacionTipo(null)} className="mb-2">← Volver</Button>
            <h3 className="font-semibold text-foreground">Reasignación por Rango</h3>
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
              <SearchableSelect value={colegioRango} onValueChange={setColegioRango} placeholder="Seleccionar colegio" options={colegios} />
            </div>
            <Button className="w-full" onClick={handleConfirmReasignacion}>Confirmar Reasignación por Rango</Button>
          </div>
        )}
      </GlassOverlay>
    </DashboardLayout>
  );
};

export default IDPEstadoPage;
