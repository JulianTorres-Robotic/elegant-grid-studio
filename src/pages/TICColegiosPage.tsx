import { useState } from "react";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import NeuCard from "@/components/dashboard/NeuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { School, Check } from "lucide-react";

const suscripciones = [
  { id: "basica", label: "Básica", desc: "Acceso limitado a funciones esenciales.", color: "border-muted-foreground" },
  { id: "premium", label: "Premium", desc: "Acceso completo con soporte prioritario.", color: "border-primary" },
  { id: "essential", label: "Essential", desc: "Funciones estándar para uso regular.", color: "border-accent" },
];

const TICColegiosPage = () => {
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [codigo, setCodigo] = useState("");
  const [suscripcion, setSuscripcion] = useState("basica");

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <School className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">TIC - Verificación / Carga de Colegios</h1>
        </div>

        <NeuCard className="p-6 max-w-2xl">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Alta de Colegio</h3>
          <div className="space-y-4">
            <div>
              <Label>Nombre de Colegio</Label>
              <Input placeholder="Ingrese el nombre del colegio" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div>
              <Label>Localidad</Label>
              <Input placeholder="Ciudad o localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)} />
            </div>
            <div>
              <Label>Código Centro</Label>
              <Input placeholder="Código identificador" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
            </div>

            {/* Subscription selector */}
            <div>
              <Label className="mb-3 block">Tipo de Suscripción</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {suscripciones.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSuscripcion(s.id)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      suscripcion === s.id
                        ? `${s.color} bg-primary/5 shadow-neu-sm`
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    {suscripcion === s.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <p className="font-semibold text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full mt-2">Registrar Colegio</Button>
          </div>
        </NeuCard>
      </div>
    </SidebarLayout>
  );
};

export default TICColegiosPage;
