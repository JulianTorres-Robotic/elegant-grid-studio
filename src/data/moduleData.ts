// Mock data for all modules

export interface PedidoLicencia {
  id: string;
  licencia: string;
  colegio: string;
  robot: string;
  cantidad: number;
  estado: "Aprobado" | "En Proceso" | "Pendiente" | "Rechazado";
  fecha: string;
}

export interface TicketProfesor {
  id: string;
  ticket: string;
  solicitante: string;
  tipo: "Externo" | "Interno";
  colegio: string;
  estado: "Aprobado" | "En Proceso" | "Pendiente" | "Autorizado";
  fechaCreacion: string;
  fechaEdicion: string;
  info: string;
}

export const colegios = [
  "Colegio San Martín",
  "Colegio Santa Rosa",
  "Instituto Técnico Nº 5",
  "Escuela Normal Superior",
  "Colegio del Sol",
  "Instituto Belgrano",
];

export const robots = ["Robot Alpha", "Robot Beta", "Robot Gamma", "Robot Delta"];

export const pedidosLicencia: PedidoLicencia[] = [
  { id: "PED-001", licencia: "LIC-2026-001", colegio: "Colegio San Martín", robot: "Robot Alpha", cantidad: 10, estado: "Aprobado", fecha: "2026-02-01" },
  { id: "PED-002", licencia: "LIC-2026-002", colegio: "Colegio Santa Rosa", robot: "Robot Beta", cantidad: 5, estado: "En Proceso", fecha: "2026-02-03" },
  { id: "PED-003", licencia: "LIC-2026-003", colegio: "Instituto Técnico Nº 5", robot: "Robot Gamma", cantidad: 15, estado: "Pendiente", fecha: "2026-02-05" },
  { id: "PED-004", licencia: "LIC-2026-004", colegio: "Escuela Normal Superior", robot: "Robot Delta", cantidad: 8, estado: "Aprobado", fecha: "2026-02-07" },
  { id: "PED-005", licencia: "LIC-2026-005", colegio: "Colegio del Sol", robot: "Robot Alpha", cantidad: 12, estado: "Rechazado", fecha: "2026-02-08" },
  { id: "PED-006", licencia: "LIC-2026-006", colegio: "Instituto Belgrano", robot: "Robot Beta", cantidad: 20, estado: "En Proceso", fecha: "2026-02-09" },
];

export const ticketsProfesores: TicketProfesor[] = [
  { id: "TKT-001", ticket: "TK-5501", solicitante: "María López", tipo: "Interno", colegio: "Colegio San Martín", estado: "Aprobado", fechaCreacion: "2026-01-15", fechaEdicion: "2026-01-20", info: "Solicitud de 5 licencias para taller de robótica." },
  { id: "TKT-002", ticket: "TK-5502", solicitante: "Pedro Gómez", tipo: "Externo", colegio: "Colegio Santa Rosa", estado: "En Proceso", fechaCreacion: "2026-01-22", fechaEdicion: "2026-02-01", info: "Requiere acceso urgente para capacitación docente." },
  { id: "TKT-003", ticket: "TK-5503", solicitante: "Ana Fernández", tipo: "Interno", colegio: "Instituto Técnico Nº 5", estado: "Pendiente", fechaCreacion: "2026-02-03", fechaEdicion: "2026-02-03", info: "Solicitud pendiente de aprobación del director." },
  { id: "TKT-004", ticket: "TK-5504", solicitante: "Luis Ramírez", tipo: "Externo", colegio: "Escuela Normal Superior", estado: "Autorizado", fechaCreacion: "2026-02-05", fechaEdicion: "2026-02-08", info: "Autorizado por coordinación regional." },
];

export const reasignacionesData = [
  { colegio: "San Martín", asignadas: 45, reasignadas: 12 },
  { colegio: "Santa Rosa", asignadas: 30, reasignadas: 8 },
  { colegio: "Técnico Nº5", asignadas: 55, reasignadas: 20 },
  { colegio: "Normal Sup.", asignadas: 25, reasignadas: 5 },
  { colegio: "Del Sol", asignadas: 40, reasignadas: 15 },
  { colegio: "Belgrano", asignadas: 35, reasignadas: 10 },
];
