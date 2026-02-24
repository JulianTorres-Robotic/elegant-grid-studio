import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTableCard from '@/components/dashboard/DataTableCard';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// 1. Definimos la interfaz de los datos que esperamos del backend
// (Esto coincide con tu esquema de Prisma)
export interface Colegio {
  id: number;
  nombre: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  contacto?: string;
  estado?: {
    id: number;
    nombre: string;
  };
}

export default function OPColegiosPage() {
  const { user } = useUser(); // Obtenemos el usuario autenticado (y su token)
  
  // 2. Estados para manejar la información
  const [colegios, setColegios] = useState<Colegio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Efecto para cargar los colegios al montar la página
  useEffect(() => {
    // Si no hay token, no intentamos hacer la petición
    if (!user?.token) {
      setLoading(false);
      return;
    }

    const fetchColegios = async () => {
      try {
        setLoading(true);
        // Hacemos la petición al proxy de Vite (/api), que lo envía a localhost:3000
        const response = await fetch('/api/colegios', {
          headers: {
            'Content-Type': 'application/json',
            // Inyectamos el JWT de Keycloak para que el backend nos dé permiso
            'Authorization': `Bearer ${user.token}` 
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los colegios del servidor');
        }

        const data = await response.json();
        setColegios(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching colegios:", err);
        setError(err.message || 'Ocurrió un error inesperado');
      } finally {
        setLoading(false);
      }
    };

    fetchColegios();
  }, [user]);

  // 4. Configuración de las columnas para tu DataTableCard
  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Nombre', accessorKey: 'nombre' },
    { header: 'Dirección', accessorKey: 'direccion' },
    { header: 'Teléfono', accessorKey: 'telefono' },
    { header: 'Email', accessorKey: 'email' },
    { 
      header: 'Estado', 
      accessorKey: 'estado',
      // Personalizamos cómo se muestra el estado (ya que es un objeto anidado)
      cell: (item: Colegio) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          item.estado?.nombre === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.estado?.nombre || 'Desconocido'}
        </span>
      )
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Colegios</h1>
          <p className="text-gray-500 text-sm mt-1">Administra las instituciones educativas registradas en el sistema.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
          <Plus size={16} />
          <span>Nuevo Colegio</span>
        </Button>
      </div>

      {/* Manejo de Estados de UI */}
      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-500 font-medium">Cargando colegios...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
          <p className="font-semibold">No se pudieron cargar los datos.</p>
          <p className="text-sm mt-1">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4 border-red-200 hover:bg-red-100"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </Button>
        </div>
      ) : (
        <DataTableCard 
          title="Listado de Colegios"
          data={colegios} 
          columns={columns} 
        />
      )}
    </DashboardLayout>
  );
}