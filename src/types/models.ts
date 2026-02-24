export interface Estado {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Colegio {
  id: number;
  nombre: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  contacto?: string;
  estado_id: number;
  estado?: Estado; // Relación que te debería devolver el back
}

export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  telefono?: string;
  colegio_id?: number;
  role_id: number;
  estado_id: number;
  colegio?: Colegio;
}