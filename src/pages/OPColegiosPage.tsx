import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School, Plus, X, Upload, Check } from "lucide-react";
import { localidades, suscripciones } from "@/data/moduleData";
import { useToast } from "@/hooks/use-toast";

interface ColegioCard {
  id: number;
  nombre: string;
  codigoCorto: string;
  codigoUnido: string;
  localidad: string;
  suscripcion: string;
}

const OPColegiosPage = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<ColegioCard[]>([
    { id: 1, nombre: "", codigoCorto: "", codigoUnido: "", localidad: "", suscripcion: "" },
  ]);

  const addCard = () => {
    setCards((prev) => [...prev, { id: Date.now(), nombre: "", codigoCorto: "", codigoUnido: "", localidad: "", suscripcion: "" }]);
  };

  const removeCard = (id: number) => {
    if (cards.length === 1) return;
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCard = (id: number, field: keyof Omit<ColegioCard, "id">, value: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleCargar = () => {
    const incomplete = cards.some((c) => !c.nombre || !c.codigoCorto || !c.codigoUnido || !c.localidad || !c.suscripcion);
    if (incomplete) {
      toast({ title: "Campos incompletos", description: "Todos los campos son obligatorios.", variant: "destructive" });
      return;
    }
    toast({ title: "Colegios cargados", description: `${cards.length} colegio(s) cargado(s) correctamente.` });
    setCards([{ id: Date.now(), nombre: "", codigoCorto: "", codigoUnido: "", localidad: "", suscripcion: "" }]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <School className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">OP - Carga de Colegios</h1>
        </div>

        <div className="space-y-4">
          {cards.map((card, idx) => (
            <NeuCard key={card.id} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Colegio #{idx + 1}
                </h3>
                {cards.length > 1 && (
                  <button onClick={() => removeCard(card.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label>Nombre de Colegio <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="Nombre"
                    value={card.nombre}
                    onChange={(e) => updateCard(card.id, "nombre", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Código Corto <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="Código corto"
                    value={card.codigoCorto}
                    onChange={(e) => updateCard(card.id, "codigoCorto", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Código Unido <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="Código unido"
                    value={card.codigoUnido}
                    onChange={(e) => updateCard(card.id, "codigoUnido", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Localidad <span className="text-destructive">*</span></Label>
                  <Select value={card.localidad} onValueChange={(v) => updateCard(card.id, "localidad", v)}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                    <SelectContent>
                      {localidades.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Subscription buttons */}
              <div className="mt-4">
                <Label>Tipo de Suscripción <span className="text-destructive">*</span></Label>
                <div className="flex gap-3 mt-2">
                  {suscripciones.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateCard(card.id, "suscripcion", s)}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                        card.suscripcion === s
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-muted-foreground/50 text-foreground"
                      }`}
                    >
                      {card.suscripcion === s && <Check className="h-3 w-3 inline mr-1" />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </NeuCard>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={addCard} className="gap-2">
            <Plus className="h-4 w-4" /> Agregar Colegio
          </Button>
          <Button onClick={handleCargar} className="gap-2">
            <Upload className="h-4 w-4" /> Cargar
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OPColegiosPage;
