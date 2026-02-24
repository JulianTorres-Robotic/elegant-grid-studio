import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, X, Check } from "lucide-react";
import { colegios, robots, tiposCartillaGenerales } from "@/data/moduleData";
import { useToast } from "@/hooks/use-toast";

interface PedidoCard {
  id: number;
  cantidad: string;
  colegio: string;
  robot: string;
  tipoCartilla: string;
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

const IDPPedidosPage = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<PedidoCard[]>([
    { id: 1, cantidad: "", colegio: "", robot: "", tipoCartilla: "", ticket: "" },
  ]);

  const addCard = () => {
    setCards((prev) => [...prev, { id: Date.now(), cantidad: "", colegio: "", robot: "", tipoCartilla: "", ticket: "" }]);
  };

  const removeCard = (id: number) => {
    if (cards.length === 1) return;
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCard = (id: number, field: keyof Omit<PedidoCard, "id">, value: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleConfirm = () => {
    const incomplete = cards.some((c) => !c.cantidad || !c.colegio || !c.robot || !c.tipoCartilla || !c.ticket);
    if (incomplete) {
      toast({ title: "Campos incompletos", description: "Todos los campos son obligatorios.", variant: "destructive" });
      return;
    }
    toast({ title: "Pedido confirmado", description: `${cards.length} pedido(s) enviado(s) correctamente.` });
    setCards([{ id: Date.now(), cantidad: "", colegio: "", robot: "", tipoCartilla: "", ticket: "" }]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <FileText className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">IDP - Pedidos de Licencias</h1>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label># Licencias <span className="text-destructive">*</span></Label>
                  <Input type="number" placeholder="Cantidad" value={card.cantidad} onChange={(e) => updateCard(card.id, "cantidad", e.target.value)} />
                </div>
                <div>
                  <Label>Colegio <span className="text-destructive">*</span></Label>
                  <SearchableSelect value={card.colegio} onValueChange={(v) => updateCard(card.id, "colegio", v)} placeholder="Seleccionar colegio" options={colegios} />
                </div>
                <div>
                  <Label>Robot <span className="text-destructive">*</span></Label>
                  <SearchableSelect value={card.robot} onValueChange={(v) => updateCard(card.id, "robot", v)} placeholder="Seleccionar robot" options={robots} />
                </div>
                <div>
                  <Label>Tipo de Cartilla <span className="text-destructive">*</span></Label>
                  <Select value={card.tipoCartilla} onValueChange={(v) => updateCard(card.id, "tipoCartilla", v)}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                    <SelectContent>
                      {tiposCartillaGenerales.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            <Check className="h-4 w-4" /> Confirmar
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IDPPedidosPage;
