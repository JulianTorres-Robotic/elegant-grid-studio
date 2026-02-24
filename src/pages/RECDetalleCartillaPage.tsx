import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Search } from "lucide-react";
import { cartillas, cartillasData, type CartillaInfo } from "@/data/moduleData";

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

const estadoColor = (estado: string) => {
  if (estado === "Activa") return "bg-success text-success-foreground";
  if (estado === "Perdida") return "bg-destructive text-destructive-foreground";
  return "bg-warning text-warning-foreground";
};

const RECDetalleCartillaPage = () => {
  const [cartilla, setCartilla] = useState("");

  const cartillaInfo = cartillasData.find((c) => c.numero === cartilla);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <CreditCard className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Recepción - Detalle de Cartilla</h1>
        </div>

        <NeuCard className="p-6 max-w-lg mx-auto">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Buscar Cartilla</h3>
          <div className="space-y-4">
            <div>
              <Label>Nº de Cartilla</Label>
              <SearchableSelect value={cartilla} onValueChange={setCartilla} placeholder="Buscar por número de cartilla..." options={cartillas} />
            </div>

            {cartillaInfo && (
              <NeuCard className="p-5 neu-inset">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Información de la Cartilla</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p className="text-muted-foreground">Número:</p>
                  <p className="font-mono font-semibold">{cartillaInfo.numero}</p>
                  <p className="text-muted-foreground">Tipo:</p>
                  <p>{cartillaInfo.tipo}</p>
                  <p className="text-muted-foreground">Categoría:</p>
                  <p className="font-mono">{cartillaInfo.categoria}</p>
                  <p className="text-muted-foreground">Colegio:</p>
                  <p>{cartillaInfo.colegio}</p>
                  <p className="text-muted-foreground">Robot:</p>
                  <p>{cartillaInfo.robot}</p>
                  <p className="text-muted-foreground">Suscripción:</p>
                  <p className="font-semibold text-primary">{cartillaInfo.suscripcion}</p>
                  <p className="text-muted-foreground">Estado:</p>
                  <td><Badge className={estadoColor(cartillaInfo.estado)}>{cartillaInfo.estado}</Badge></td>
                </div>
              </NeuCard>
            )}

            {!cartillaInfo && cartilla && (
              <p className="text-sm text-muted-foreground text-center py-4">No se encontró información para esta cartilla.</p>
            )}
          </div>
        </NeuCard>
      </div>
    </DashboardLayout>
  );
};

export default RECDetalleCartillaPage;
