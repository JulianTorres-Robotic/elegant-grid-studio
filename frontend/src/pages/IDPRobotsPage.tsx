import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, X, Save, Edit2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RobotEntry {
  id: number;
  nombre: string;
}

interface SavedRobot {
  id: number;
  nombre: string;
  status: "Disponible" | "No Disponible";
}

const IDPRobotsPage = () => {
  const { toast } = useToast();
  const [robotsForm, setRobotsForm] = useState<RobotEntry[]>([{ id: Date.now(), nombre: "" }]);
  const [savedRobots, setSavedRobots] = useState<SavedRobot[]>([
    { id: 1, nombre: "VEX-Bot-Alpha", status: "Disponible" },
    { id: 2, nombre: "VEX-Bot-Beta", status: "No Disponible" },
    { id: 3, nombre: "VEX-Bot-Gamma", status: "Disponible" },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const addRobotInput = () => setRobotsForm([...robotsForm, { id: Date.now(), nombre: "" }]);
  const removeRobotInput = (id: number) => {
    if (robotsForm.length === 1) return;
    setRobotsForm(robotsForm.filter((r) => r.id !== id));
  };
  const updateRobotInput = (id: number, value: string) => setRobotsForm(robotsForm.map((r) => (r.id === id ? { ...r, nombre: value } : r)));

  const handleConfirm = () => {
    const incomplete = robotsForm.some((r) => !r.nombre.trim());
    if (incomplete) {
      toast({ title: "Datos incompletos", description: "Todos los robots deben tener un nombre.", variant: "destructive" });
      return;
    }
    const newRobots: SavedRobot[] = robotsForm.map((r) => ({ id: r.id, nombre: r.nombre, status: "Disponible" as const }));
    setSavedRobots([...newRobots, ...savedRobots]);
    toast({ title: "Carga Exitosa", description: `Se han registrado ${newRobots.length} robots al inventario.` });
    setRobotsForm([{ id: Date.now(), nombre: "" }]);
  };

  const startEdit = (robot: SavedRobot) => {
    setEditingId(robot.id);
    setEditingName(robot.nombre);
  };

  const saveEdit = (id: number) => {
    if (!editingName.trim()) return;
    setSavedRobots(savedRobots.map((r) => (r.id === id ? { ...r, nombre: editingName } : r)));
    setEditingId(null);
    toast({ title: "Robot actualizado", description: "El nombre del robot ha sido modificado." });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Bot className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">IDP - Gestión de Robots</h1>
        </div>

        <NeuCard className="p-5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Nueva Carga De Robots</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {robotsForm.map((robot, idx) => (
              <div key={robot.id} className="flex gap-3 items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground mb-1 block">Nombre del Robot #{idx + 1}</Label>
                  <Input placeholder={`Ej: VEX-bot-${idx + 1}`} value={robot.nombre} onChange={(e) => updateRobotInput(robot.id, e.target.value)} />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeRobotInput(robot.id)} disabled={robotsForm.length === 1} className="mb-0.5 text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addRobotInput} className="gap-3">
              <Plus className="h-4 w-4" /> Agregar
            </Button>
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <Button className="w-full gap-2" onClick={handleConfirm}>
              <Save className="h-4 w-4" /> Confirmar Carga al Inventario
            </Button>
          </div>
        </NeuCard>

        <NeuCard className="p-0 overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Robots Cargados en Sistema</h3>
              <Badge variant="outline" className="text-xs font-normal">Total: {savedRobots.length}</Badge>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium">
                <tr>
                  <th className="px-5 py-3">Nombre / ID</th>
                  <th className="px-5 py-3 text-center">Estado</th>
                  <th className="px-5 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {savedRobots.length === 0 && (
                  <tr><td colSpan={3} className="px-5 py-8 text-center text-muted-foreground">No hay robots cargados aún.</td></tr>
                )}
                {savedRobots.map((robot) => (
                  <tr key={robot.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">
                      {editingId === robot.id ? (
                        <div className="flex gap-2 items-center">
                          <Input value={editingName} onChange={(e) => setEditingName(e.target.value)} className="h-8 text-sm" />
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => saveEdit(robot.id)}><Check className="h-4 w-4 text-success" /></Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                        </div>
                      ) : robot.nombre}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <Badge className={robot.status === "Disponible" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}>
                        {robot.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => startEdit(robot)} title="Editar">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NeuCard>
      </div>
    </DashboardLayout>
  );
};

export default IDPRobotsPage;
