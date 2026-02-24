import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Plus, X, Check } from "lucide-react";
import { colegios } from "@/data/moduleData";
import { useToast } from "@/hooks/use-toast";

interface PedidoProfesorCard {
  id: number;
  colegio: string;
  cantidad: string;
  ticket: string;
}

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
  const [cards, setCards] = useState<PedidoProfesorCard[]>([
    { id: 1, colegio: "", cantidad: "", ticket: "" },
  ]);

  const addCard = () => {
    setCards((prev) => [...prev, { id: Date.now(), colegio: "", cantidad: "", ticket: "" }]);
  };

  const removeCard = (id: number) => {
    if (cards.length === 1) return;
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCard = (id: number, field: keyof Omit<PedidoProfesorCard, "id">, value: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleConfirm = () => {
    const incomplete = cards.some((c) => !c.colegio || !c.cantidad || !c.ticket);
    if (incomplete) {
      toast({ title: "Campos incompletos", description: "Todos los campos son obligatorios.", variant: "destructive" });
      return;
    }
    toast({ title: "Pedido confirmado", description: `${cards.length} pedido(s) de licencias para profesores enviado(s).` });
    setCards([{ id: Date.now(), colegio: "", cantidad: "", ticket: "" }]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">OP - Pedido de Licencias Profesores</h1>
        </div>

        <div className="space-y-4">
          {cards.map((card, idx) => (
            <NeuCard key={card.id} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Pedido #{idx + 1}
                </h3>
                {cards.length > 1 && (
                  <button onClick={() => removeCard(card.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label>Colegio <span className="text-destructive">*</span></Label>
                  <SearchableSelect value={card.colegio} onValueChange={(v) => updateCard(card.id, "colegio", v)} placeholder="Buscar colegio..." options={colegios} />
                </div>
                <div>
                  <Label># Licencias <span className="text-destructive">*</span></Label>
                  <Input type="number" placeholder="Cantidad" value={card.cantidad} onChange={(e) => updateCard(card.id, "cantidad", e.target.value)} />
                </div>
                <div>
                  <Label># Ticket <span className="text-destructive">*</span></Label>
                  <Input placeholder="Número de ticket" value={card.ticket} onChange={(e) => updateCard(card.id, "ticket", e.target.value)} />
                </div>
              </div>
            </NeuCard>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={addCard} className="gap-2">
            <Plus className="h-4 w-4" /> Agregar Pedido
          </Button>
          <Button onClick={handleConfirm} className="gap-2">
            <Check className="h-4 w-4" /> Confirmar Pedido
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OPLicenciasProfesoresPage;
