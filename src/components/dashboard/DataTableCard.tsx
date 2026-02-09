import { useState } from "react";
import NeuCard from "./NeuCard";
import { tableData } from "@/data/mockData";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 4;

const statusColor: Record<string, string> = {
  Activo: "bg-primary/15 text-primary",
  "En progreso": "bg-warning/15 text-warning-foreground",
  Completado: "bg-success/15 text-success",
  Pendiente: "bg-destructive/15 text-destructive",
};

const DataTableCard = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(tableData.length / PAGE_SIZE);
  const rows = tableData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <NeuCard className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-foreground">Proyectos Recientes</h3>
      <div className="rounded-xl overflow-hidden neu-inset">
        <Table>
          <TableHeader>
            <TableRow className="border-none">
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="hidden sm:table-cell">Depto.</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className="border-none">
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColor[row.status] || ""}`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{row.department}</TableCell>
                <TableCell className="hidden md:table-cell">{row.date}</TableCell>
                <TableCell className="text-right">${row.value.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Pág. {page + 1} de {totalPages}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="neu-card-sm rounded-xl border-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="neu-card-sm rounded-xl border-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </NeuCard>
  );
};

export default DataTableCard;
