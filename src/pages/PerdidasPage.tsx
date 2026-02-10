import { useState } from "react";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Search, CheckCircle, Key } from "lucide-react";
import { colegios, robots } from "@/data/moduleData";

const PerdidasPage = () => {
  const [cartillaPresencial, setCartillaPresencial] = useState("");
  const [cartillaVirtual, setCartillaVirtual] = useState("");
  const [colegioVirtual, setColegioVirtual] = useState("");
  const [robotVirtual, setRobotVirtual] = useState("");
  const [cartillaRecepcion, setCartillaRecepcion] = useState("");
  const [colegioRecepcion, setColegioRecepcion] = useState("");

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-7 w-7 text-warning" />
          <h1 className="text-2xl font-bold text-foreground">Gestión de Pérdidas y Recepción</h1>
        </div>

        <Tabs defaultValue="presencial" className="w-full">
          <TabsList className="grid w-full grid-cols-3 neu-card-sm">
            <TabsTrigger value="presencial">Pérdida Presencial</TabsTrigger>
            <TabsTrigger value="virtual">Pérdida Virtual</TabsTrigger>
            <TabsTrigger value="recepcion">Recepción</TabsTrigger>
          </TabsList>

          {/* Caso 1: Presencial */}
          <TabsContent value="presencial">
            <NeuCard className="p-6 max-w-lg mx-auto">
              <h3 className="text-lg font-semibold mb-1">Pérdida Caso 1 - Presencial</h3>
              <p className="text-sm text-muted-foreground mb-6">Reportar pérdida de cartilla en modalidad presencial.</p>
              <div className="space-y-4">
                <div>
                  <Label># Cartilla</Label>
                  <Input placeholder="Ingrese número de cartilla" value={cartillaPresencial} onChange={(e) => setCartillaPresencial(e.target.value)} />
                </div>
                <div>
                  <Label>Selector</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tipo1">Tipo 1</SelectItem>
                      <SelectItem value="tipo2">Tipo 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full gap-2 bg-destructive hover:bg-destructive/90">
                  <CheckCircle className="h-4 w-4" /> Confirmar y cambiar estado a Perdida
                </Button>
              </div>
            </NeuCard>
          </TabsContent>

          {/* Caso 2: Virtual */}
          <TabsContent value="virtual">
            <NeuCard className="p-6 max-w-lg mx-auto">
              <h3 className="text-lg font-semibold mb-1">Pérdida Caso 2 - Virtual</h3>
              <p className="text-sm text-muted-foreground mb-6">Reportar pérdida y generar nueva licencia.</p>
              <div className="space-y-4">
                <div>
                  <Label>Colegio</Label>
                  <Select value={colegioVirtual} onValueChange={setColegioVirtual}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar colegio" /></SelectTrigger>
                    <SelectContent>
                      {colegios.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Robot</Label>
                  <Select value={robotVirtual} onValueChange={setRobotVirtual}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar robot" /></SelectTrigger>
                    <SelectContent>
                      {robots.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label># Cartilla</Label>
                  <Input placeholder="Ingrese número de cartilla" value={cartillaVirtual} onChange={(e) => setCartillaVirtual(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 gap-2">
                    <Key className="h-4 w-4" /> Creación Licencia
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    Mostrar Licencia
                  </Button>
                </div>
              </div>
            </NeuCard>
          </TabsContent>

          {/* Recepción */}
          <TabsContent value="recepcion">
            <NeuCard className="p-6 max-w-lg mx-auto">
              <h3 className="text-lg font-semibold mb-1">Recepción</h3>
              <p className="text-sm text-muted-foreground mb-6">Registrar devolución de cartillas.</p>
              <div className="space-y-4">
                <div>
                  <Label># de Cartilla</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Buscar cartilla" value={cartillaRecepcion} onChange={(e) => setCartillaRecepcion(e.target.value)} className="flex-1" />
                    <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div>
                  <Label>Colegio Final</Label>
                  <div className="flex gap-2">
                    <Select value={colegioRecepcion} onValueChange={setColegioRecepcion}>
                      <SelectTrigger><SelectValue placeholder="Seleccionar colegio" /></SelectTrigger>
                      <SelectContent>
                        {colegios.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
                  </div>
                </div>
                <Button className="w-full">Confirmar Recepción</Button>
              </div>
            </NeuCard>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default PerdidasPage;
