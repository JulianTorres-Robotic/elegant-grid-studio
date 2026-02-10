import { useState } from "react";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Download, FileText, Edit, Eye } from "lucide-react";
import { pedidosLicencia, colegios, robots, type PedidoLicencia } from "@/data/moduleData";

const estadoColors: Record<string, string> = {
  Aprobado: "bg-success text-success-foreground",
  "En Proceso": "bg-primary text-primary-foreground",
  Pendiente: "bg-warning text-warning-foreground",
  Rechazado: "bg-destructive text-destructive-foreground",
};

const IDPPedidosPage = () => {
  const [filtroLicencia, setFiltroLicencia] = useState("");
  const [filtroColegio, setFiltroColegio] = useState("");
  const [filtroRobot, setFiltroRobot] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [nuevoColegio, setNuevoColegio] = useState("");
  const [nuevoRobot, setNuevoRobot] = useState("");

  const filtered = pedidosLicencia.filter((p) => {
    if (filtroLicencia && !p.licencia.toLowerCase().includes(filtroLicencia.toLowerCase())) return false;
    if (filtroColegio && p.colegio !== filtroColegio) return false;
    if (filtroRobot && p.robot !== filtroRobot) return false;
    return true;
  });

  return (
    <SidebarLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">IDP - Pedidos de Licencia</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Exportar a .xlsx
          </Button>
        </div>

        {/* Filters + Creation form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Filters */}
          <NeuCard className="p-5">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Filtro de Búsqueda</h3>
            <div className="space-y-3">
              <div>
                <Label>Licencia</Label>
                <Input placeholder="Buscar por licencia..." value={filtroLicencia} onChange={(e) => setFiltroLicencia(e.target.value)} />
              </div>
              <div>
                <Label>Colegio</Label>
                <Select value={filtroColegio} onValueChange={setFiltroColegio}>
                  <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {colegios.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Robot</Label>
                <Select value={filtroRobot} onValueChange={setFiltroRobot}>
                  <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {robots.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full gap-2" onClick={() => { setFiltroColegio(""); setFiltroRobot(""); setFiltroLicencia(""); }}>
                <Search className="h-4 w-4" /> Limpiar Filtros
              </Button>
            </div>
          </NeuCard>

          {/* Creation form */}
          <NeuCard className="p-5">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Crear Pedido</h3>
            <div className="space-y-3">
              <div>
                <Label># Licencias</Label>
                <Input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
              </div>
              <div>
                <Label>Colegio</Label>
                <Select value={nuevoColegio} onValueChange={setNuevoColegio}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar colegio" /></SelectTrigger>
                  <SelectContent>
                    {colegios.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Robot</Label>
                <Select value={nuevoRobot} onValueChange={setNuevoRobot}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar robot" /></SelectTrigger>
                  <SelectContent>
                    {robots.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2"><Plus className="h-4 w-4" /> Agg</Button>
                <Button className="flex-1">Confirmar</Button>
              </div>
            </div>
          </NeuCard>
        </div>

        {/* Orders table */}
        <NeuCard className="p-5 overflow-x-auto">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Pedidos Registrados</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-semibold text-muted-foreground">ID</th>
                <th className="pb-3 font-semibold text-muted-foreground">Licencia</th>
                <th className="pb-3 font-semibold text-muted-foreground">Colegio</th>
                <th className="pb-3 font-semibold text-muted-foreground">Robot</th>
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
                  <td className="py-3">{p.licencia}</td>
                  <td className="py-3">{p.colegio}</td>
                  <td className="py-3">{p.robot}</td>
                  <td className="py-3 text-center">{p.cantidad}</td>
                  <td className="py-3">
                    <Badge className={estadoColors[p.estado]}>{p.estado}</Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{p.fecha}</td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No se encontraron pedidos.</p>
          )}
        </NeuCard>
      </div>
    </SidebarLayout>
  );
};

export default IDPPedidosPage;
