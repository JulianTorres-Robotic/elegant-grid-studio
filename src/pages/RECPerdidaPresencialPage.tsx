import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { cartillas } from "@/data/moduleData";
import { useToast } from "@/hooks/use-toast";

const RECPerdidaPresencialPage = () => {
  const { toast } = useToast();
  const [cartilla, setCartilla] = useState("");
  const [search, setSearch] = useState("");

  const filtered = cartillas.filter((c) => c.toLowerCase().includes(search.toLowerCase()));

  const handleConfirm = () => {
    if (!cartilla) {
      toast({ title: "Campo requerido", description: "Seleccione un número de cartilla.", variant: "destructive" });
      return;
    }
    toast({ title: "Estado actualizado", description: `Cartilla ${cartilla} marcada como Perdida.` });
    setCartilla("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-7 w-7 text-warning" />
          <h1 className="text-2xl font-bold text-foreground">Recepción - Pérdida Caso 1 (Presencial)</h1>
        </div>

        <NeuCard className="p-6 max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-1">Reportar Pérdida Presencial</h3>
          <p className="text-sm text-muted-foreground mb-6">Buscar y marcar una cartilla como perdida.</p>
          <div className="space-y-4">
            <div>
              <Label>Nº Cartilla <span className="text-destructive">*</span></Label>
              <Select value={cartilla} onValueChange={setCartilla}>
                <SelectTrigger><SelectValue placeholder="Buscar cartilla..." /></SelectTrigger>
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
                  {filtered.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full gap-2 bg-destructive hover:bg-destructive/90" onClick={handleConfirm}>
              <CheckCircle className="h-4 w-4" /> Confirmar y cambiar estado a Perdida
            </Button>
          </div>
        </NeuCard>
      </div>
    </DashboardLayout>
  );
};

export default RECPerdidaPresencialPage;
