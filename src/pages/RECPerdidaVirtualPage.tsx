import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Key } from "lucide-react";
import { colegios, robots, cartillas } from "@/data/moduleData";
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

const RECPerdidaVirtualPage = () => {
  const { toast } = useToast();
  const [colegio, setColegio] = useState("");
  const [robot, setRobot] = useState("");
  const [cartilla, setCartilla] = useState("");
  const [licenciaCreada, setLicenciaCreada] = useState<string | null>(null);

  const handleCrearLicencia = () => {
    if (!colegio || !robot || !cartilla) {
      toast({ title: "Campos requeridos", description: "Todos los campos son obligatorios.", variant: "destructive" });
      return;
    }
    const newLic = `LIC-${Date.now().toString().slice(-6)}`;
    setLicenciaCreada(newLic);
    toast({ title: "Licencia creada", description: `Nueva licencia: ${newLic}` });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Key className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Recepción - Pérdida Caso 2 (Virtual)</h1>
        </div>

        <NeuCard className="p-6 max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-1">Pérdida Virtual - Creación de Licencia</h3>
          <p className="text-sm text-muted-foreground mb-6">Ingrese los datos para generar una nueva licencia.</p>
          <div className="space-y-4">
            <div>
              <Label>Colegio <span className="text-destructive">*</span></Label>
              <SearchableSelect value={colegio} onValueChange={setColegio} placeholder="Buscar colegio..." options={colegios} />
            </div>
            <div>
              <Label>Robot <span className="text-destructive">*</span></Label>
              <SearchableSelect value={robot} onValueChange={setRobot} placeholder="Buscar robot..." options={robots} />
            </div>
            <div>
              <Label>Nº Cartilla <span className="text-destructive">*</span></Label>
              <SearchableSelect value={cartilla} onValueChange={setCartilla} placeholder="Buscar cartilla..." options={cartillas} />
            </div>
            <Button className="w-full gap-2" onClick={handleCrearLicencia}>
              <Key className="h-4 w-4" /> Creación de Licencia
            </Button>

            {licenciaCreada && (
              <NeuCard className="p-4 mt-4 neu-inset">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Licencia Generada</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">Licencia:</p>
                  <p className="font-mono font-semibold text-primary">{licenciaCreada}</p>
                  <p className="text-muted-foreground">Colegio:</p>
                  <p>{colegio}</p>
                  <p className="text-muted-foreground">Robot:</p>
                  <p>{robot}</p>
                  <p className="text-muted-foreground">Cartilla:</p>
                  <p className="font-mono">{cartilla}</p>
                </div>
              </NeuCard>
            )}
          </div>
        </NeuCard>
      </div>
    </DashboardLayout>
  );
};

export default RECPerdidaVirtualPage;
