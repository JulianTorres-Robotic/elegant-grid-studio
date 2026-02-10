import { useState } from "react";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";
import { colegios, ticketsProfesores } from "@/data/moduleData";

const estadoColors: Record<string, string> = {
  Aprobado: "bg-success text-success-foreground",
  "En Proceso": "bg-primary text-primary-foreground",
  Pendiente: "bg-warning text-warning-foreground",
  Autorizado: "bg-accent text-accent-foreground",
};

const LicenciasProfesoresPage = () => {
  const [solicitante, setSolicitante] = useState("");
  const [esExterno, setEsExterno] = useState(false);
  const [ticket, setTicket] = useState("");
  const [colegio, setColegio] = useState("");
  const [info, setInfo] = useState("");
  const [fechaCreacion] = useState(new Date().toISOString().split("T")[0]);
  const [fechaEdicion] = useState(new Date().toISOString().split("T")[0]);

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Pedido de Licencias Profesores</h1>
        </div>

        {/* Request form */}
        <NeuCard className="p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Nueva Solicitud</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nombre Solicitante</Label>
              <Input placeholder="Nombre completo" value={solicitante} onChange={(e) => setSolicitante(e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label>Tipo de Usuario</Label>
                <div className="flex items-center gap-3 h-10">
                  <span className={`text-sm ${!esExterno ? "font-semibold text-foreground" : "text-muted-foreground"}`}>Interno</span>
                  <Switch checked={esExterno} onCheckedChange={setEsExterno} />
                  <span className={`text-sm ${esExterno ? "font-semibold text-foreground" : "text-muted-foreground"}`}>Externo</span>
                </div>
              </div>
            </div>
            <div>
              <Label># Ticket</Label>
              <Input placeholder="Número de ticket" value={ticket} onChange={(e) => setTicket(e.target.value)} />
            </div>
            <div>
              <Label>Colegios</Label>
              <Select value={colegio} onValueChange={setColegio}>
                <SelectTrigger><SelectValue placeholder="Seleccionar colegio" /></SelectTrigger>
                <SelectContent>
                  {colegios.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Info Adicional</Label>
              <Textarea placeholder="Detalles de la solicitud..." rows={4} value={info} onChange={(e) => setInfo(e.target.value)} />
            </div>
            <div>
              <Label>Fecha de Creación</Label>
              <Input type="date" value={fechaCreacion} readOnly className="bg-muted/50" />
            </div>
            <div>
              <Label>Fecha de Edición</Label>
              <Input type="date" value={fechaEdicion} readOnly className="bg-muted/50" />
            </div>
          </div>
          <Button className="mt-4">Enviar Solicitud</Button>
        </NeuCard>

        {/* Tracking table */}
        <NeuCard className="p-5 overflow-x-auto">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Historial de Tickets</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-semibold text-muted-foreground">ID</th>
                <th className="pb-3 font-semibold text-muted-foreground">Ticket</th>
                <th className="pb-3 font-semibold text-muted-foreground">Solicitante</th>
                <th className="pb-3 font-semibold text-muted-foreground">Tipo</th>
                <th className="pb-3 font-semibold text-muted-foreground">Colegio</th>
                <th className="pb-3 font-semibold text-muted-foreground">Estado</th>
                <th className="pb-3 font-semibold text-muted-foreground">Creación</th>
                <th className="pb-3 font-semibold text-muted-foreground">Edición</th>
              </tr>
            </thead>
            <tbody>
              {ticketsProfesores.map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-mono text-xs">{t.id}</td>
                  <td className="py-3 font-medium">{t.ticket}</td>
                  <td className="py-3">{t.solicitante}</td>
                  <td className="py-3">
                    <Badge variant="outline">{t.tipo}</Badge>
                  </td>
                  <td className="py-3">{t.colegio}</td>
                  <td className="py-3">
                    <Badge className={estadoColors[t.estado]}>{t.estado}</Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{t.fechaCreacion}</td>
                  <td className="py-3 text-muted-foreground">{t.fechaEdicion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </NeuCard>
      </div>
    </SidebarLayout>
  );
};

export default LicenciasProfesoresPage;
