import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Check } from "lucide-react";
import { colegios } from "@/data/moduleData";
import { useToast } from "@/hooks/use-toast";

const SearchableSelect = ({
  value,
  onValueChange,
  placeholder,
  options,
}: {
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) => {
  const [search, setSearch] = useState("");
  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>
        <div className="px-2 pb-2">
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 text-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        {filtered.length === 0 && <p className="text-sm text-muted-foreground px-3 py-2">Sin resultados</p>}
        {filtered.map((o) => (
          <SelectItem key={o} value={o}>{o}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const OPLicenciasProfesoresPage = () => {
  const { toast } = useToast();
  const [colegio, setColegio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [ticket, setTicket] = useState("");

  const handleConfirm = () => {
    if (!colegio || !cantidad || !ticket) {
      toast({ title: "Campos requeridos", description: "Todos los campos son obligatorios.", variant: "destructive" });
      return;
    }
    toast({ title: "Pedido confirmado", description: `Pedido de ${cantidad} licencias para ${colegio} (Ticket: ${ticket}).` });
    setColegio("");
    setCantidad("");
    setTicket("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">OP - Pedido de Licencias Profesores</h1>
        </div>

        <NeuCard className="p-6 max-w-lg mx-auto">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Nueva Solicitud</h3>
          <div className="space-y-4">
            <div>
              <Label>Colegio <span className="text-destructive">*</span></Label>
              <SearchableSelect value={colegio} onValueChange={setColegio} placeholder="Buscar colegio..." options={colegios} />
            </div>
            <div>
              <Label># Licencias <span className="text-destructive">*</span></Label>
              <Input type="number" placeholder="Cantidad de licencias" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            </div>
            <div>
              <Label># Ticket <span className="text-destructive">*</span></Label>
              <Input placeholder="Número de ticket" value={ticket} onChange={(e) => setTicket(e.target.value)} />
            </div>
            <Button className="w-full gap-2" onClick={handleConfirm}>
              <Check className="h-4 w-4" /> Confirmar Pedido
            </Button>
          </div>
        </NeuCard>
      </div>
    </DashboardLayout>
  );
};

export default OPLicenciasProfesoresPage;
