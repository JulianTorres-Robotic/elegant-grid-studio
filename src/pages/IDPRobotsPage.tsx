import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Bot, Plus, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RobotCard {
  id: number;
  nombre: string;
}

const IDPRobotsPage = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<RobotCard[]>([{ id: 1, nombre: "" }]);

  const addCard = () => {
    setCards((prev) => [...prev, { id: Date.now(), nombre: "" }]);
  };

  const removeCard = (id: number) => {
    if (cards.length === 1) return;
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCard = (id: number, nombre: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, nombre } : c)));
  };

  const handleConfirm = () => {
    const incomplete = cards.some((c) => !c.nombre.trim());
    if (incomplete) {
      toast({ title: "Campos incompletos", description: "El nombre del robot es obligatorio.", variant: "destructive" });
      return;
    }
    toast({ title: "Robots cargados", description: `${cards.length} robot(s) cargado(s) correctamente.` });
    setCards([{ id: Date.now(), nombre: "" }]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Bot className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">IDP - Carga de Robots</h1>
        </div>

        <div className="space-y-4">
          {cards.map((card, idx) => (
            <NeuCard key={card.id} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Robot #{idx + 1}
                </h3>
                {cards.length > 1 && (
                  <button onClick={() => removeCard(card.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div>
                <Label>Nombre del Robot <span className="text-destructive">*</span></Label>
                <Input
                  placeholder="Ingrese el nombre del robot"
                  value={card.nombre}
                  onChange={(e) => updateCard(card.id, e.target.value)}
                />
              </div>
            </NeuCard>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={addCard} className="gap-2">
            <Plus className="h-4 w-4" /> Agregar Robot
          </Button>
          <Button onClick={handleConfirm} className="gap-2">
            <Check className="h-4 w-4" /> Confirmar
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IDPRobotsPage;
