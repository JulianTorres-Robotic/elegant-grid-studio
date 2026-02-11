import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { colegios, cartillas } from "@/data/moduleData";
import { useToast } from "@/hooks/use-toast";

const SearchableSelect = ({
  value,
  onValueChange,
  placeholder,
  options,
  error,
}: {
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
  options: string[];
  error?: string;
}) => {
  const [search, setSearch] = useState("");
  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={error ? "border-destructive" : ""}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
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
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
};

const RECReasignacionPage = () => {
  const { toast } = useToast();
  const [cartilla, setCartilla] = useState("");
  const [colegioFinal, setColegioFinal] = useState("");
  const [errors, setErrors] = useState<{ cartilla?: string; colegio?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!cartilla) newErrors.cartilla = "El número de cartilla es obligatorio.";
    if (!colegioFinal) newErrors.colegio = "El colegio final es obligatorio.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    toast({ title: "Reasignación exitosa", description: `Cartilla ${cartilla} reasignada a ${colegioFinal}.` });
    setCartilla("");
    setColegioFinal("");
    setErrors({});
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Recepción - Reasignación</h1>
        </div>

        <NeuCard className="p-6 max-w-lg mx-auto">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Reasignar Cartilla</h3>
          <div className="space-y-4">
            <div>
              <Label>Nº de Cartilla <span className="text-destructive">*</span></Label>
              <SearchableSelect
                value={cartilla}
                onValueChange={(v) => { setCartilla(v); setErrors((e) => ({ ...e, cartilla: undefined })); }}
                placeholder="Buscar cartilla..."
                options={cartillas}
                error={errors.cartilla}
              />
            </div>
            <div>
              <Label>Colegio Final <span className="text-destructive">*</span></Label>
              <SearchableSelect
                value={colegioFinal}
                onValueChange={(v) => { setColegioFinal(v); setErrors((e) => ({ ...e, colegio: undefined })); }}
                placeholder="Buscar colegio..."
                options={colegios}
                error={errors.colegio}
              />
            </div>
            <Button className="w-full gap-2" onClick={handleSubmit}>
              <RefreshCw className="h-4 w-4" /> Reasignar
            </Button>
          </div>
        </NeuCard>
      </div>
    </DashboardLayout>
  );
};

export default RECReasignacionPage;
