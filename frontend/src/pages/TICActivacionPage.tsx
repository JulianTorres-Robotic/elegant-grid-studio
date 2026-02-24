import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Zap } from "lucide-react";
import { pedidosLicencia, pedidosProfesores } from "@/data/moduleData";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

const estadoBadgeClass = (estado: string) => {
  if (estado === "Aprobado") return "bg-success text-success-foreground";
  if (estado === "Pendiente") return "bg-warning text-warning-foreground";
  return "bg-destructive text-destructive-foreground";
};

const TICActivacionPage = () => {
  const { toast } = useToast();
  const [busquedaIDP, setBusquedaIDP] = useState("");
  const [busquedaOP, setBusquedaOP] = useState("");

  const filteredIDP = pedidosLicencia.filter((p) =>
    p.id.toLowerCase().includes(busquedaIDP.toLowerCase()) ||
    p.ticket.toLowerCase().includes(busquedaIDP.toLowerCase())
  );

  const filteredOP = pedidosProfesores.filter((p) =>
    p.id.toLowerCase().includes(busquedaOP.toLowerCase()) ||
    p.ticket.toLowerCase().includes(busquedaOP.toLowerCase())
  );

  const exportCSV = (type: "idp" | "op") => {
    const data = type === "idp"
      ? pedidosLicencia.map((p) => ({ ID: p.id, Ticket: p.ticket, Colegio: p.colegio, Robot: p.robot, TipoCartilla: p.tipoCartilla, Cartilla: p.cartilla, Cantidad: p.cantidad, Estado: p.estado, Fecha: p.fecha }))
      : pedidosProfesores.map((p) => ({ ID: p.id, Ticket: p.ticket, Colegio: p.colegio, CantidadLicencias: p.cantidadLicencias, Estado: p.estado, Fecha: p.fecha }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");
    XLSX.writeFile(wb, `pedidos-${type}.xlsx`);
    toast({ title: "Exportado", description: `CSV de pedidos ${type.toUpperCase()} descargado.` });
  };

  const handleCambioEstado = (id: string, nuevoEstado: string, tipo: string) => {
    toast({ title: "Estado actualizado", description: `${id} cambiado a ${nuevoEstado} (${tipo}).` });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Zap className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">TIC - Activación de Licencias</h1>
        </div>

        {/* IDP Section */}
        <NeuCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pedidos IDP - Licencias</h3>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => exportCSV("idp")}>
              <Download className="h-3.5 w-3.5" /> Exportar CSV
            </Button>
          </div>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Buscar por ID o Ticket..." value={busquedaIDP} onChange={(e) => setBusquedaIDP(e.target.value)} />
            <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-semibold text-muted-foreground">ID</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Ticket</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Colegio</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Cant.</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Estado</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Cambiar Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredIDP.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-mono text-xs">{p.id}</td>
                    <td className="py-3 font-medium">{p.ticket}</td>
                    <td className="py-3">{p.colegio}</td>
                    <td className="py-3 text-center">{p.cantidad}</td>
                    <td className="py-3"><Badge className={estadoBadgeClass(p.estado)}>{p.estado}</Badge></td>
                    <td className="py-3">
                      <Select onValueChange={(v) => handleCambioEstado(p.id, v, "IDP")}>
                        <SelectTrigger className="h-8 w-36 text-xs"><SelectValue placeholder="Cambiar..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aprobado">Aprobado</SelectItem>
                          <SelectItem value="No Aprobado">No Aprobado</SelectItem>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NeuCard>

        {/* OP Section */}
        <NeuCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pedidos OP - Profesores</h3>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => exportCSV("op")}>
              <Download className="h-3.5 w-3.5" /> Exportar CSV
            </Button>
          </div>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Buscar por ID o Ticket..." value={busquedaOP} onChange={(e) => setBusquedaOP(e.target.value)} />
            <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-semibold text-muted-foreground">ID</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Ticket</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Colegio</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Cant. Lic.</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Estado</th>
                  <th className="pb-3 font-semibold text-muted-foreground">Cambiar Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredOP.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-mono text-xs">{p.id}</td>
                    <td className="py-3 font-medium">{p.ticket}</td>
                    <td className="py-3">{p.colegio}</td>
                    <td className="py-3 text-center">{p.cantidadLicencias}</td>
                    <td className="py-3"><Badge className={estadoBadgeClass(p.estado)}>{p.estado}</Badge></td>
                    <td className="py-3">
                      <Select onValueChange={(v) => handleCambioEstado(p.id, v, "OP")}>
                        <SelectTrigger className="h-8 w-36 text-xs"><SelectValue placeholder="Cambiar..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aprobado">Aprobado</SelectItem>
                          <SelectItem value="No Aprobado">No Aprobado</SelectItem>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NeuCard>
      </div>
    </DashboardLayout>
  );
};

export default TICActivacionPage;
