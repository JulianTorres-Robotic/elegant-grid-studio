import React, { useState } from "react";
import NeuCard from "./NeuCard";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead,
  TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {} from "@/data/mockData";

const PAGE_SIZE = 4;
// 1. Definimos las propiedades que este componente va a recibir
interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableCardProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
}

// 2. Usamos un genérico <T> para que la tabla acepte cualquier tipo de dato (Colegios, Usuarios, etc)
export default function DataTableCard<T>({ title, data, columns }: DataTableCardProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrado básico buscando coincidencias de texto en cualquier propiedad
  const filteredData = data.filter((item) =>
    Object.values(item as any).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <NeuCard className="p-0 overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 h-9 bg-gray-50 border-none focus-visible:ring-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx} className="font-semibold text-gray-600">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((item, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-gray-50/30 transition-colors">
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex}>
                      {/* Si enviamos la propiedad "cell", la usa para renderizar. Si no, imprime el texto crudo */}
                      {col.cell ? col.cell(item) : String((item as any)[col.accessorKey] || "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24 text-gray-500">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Paginación */}
      <div className="mt-auto p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <div>
          Mostrando {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} a{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length} registros
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </NeuCard>
  );
}