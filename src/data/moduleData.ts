// Mock data for all modules

export interface PedidoLicencia {
  id: string;
  colegio: string;
  robot: string;
  cartilla: string;
  cantidad: number;
  estado: "Aprobado" | "No Aprobado";
  fecha: string;
}

export interface PedidoProfesor {
  id: string;
  ticket: string;
  colegio: string;
  cantidadLicencias: number;
  estado: "Aprobado" | "No Aprobado";
  fecha: string;
  licenciasCreadas?: string[];
}

export const colegios = [
  "Colegio San Martín",
  "Colegio Santa Rosa",
  "Instituto Técnico Nº 5",
  "Escuela Normal Superior",
  "Colegio del Sol",
  "Instituto Belgrano",
  "Colegio Nacional",
  "Escuela Primaria Nº 12",
];

export const robots = ["Robot Alpha", "Robot Beta", "Robot Gamma", "Robot Delta", "Robot Epsilon"];

export const cartillas = [
  "CART-001", "CART-002", "CART-003", "CART-004", "CART-005",
  "CART-006", "CART-007", "CART-008", "CART-009", "CART-010",
  "CART-011", "CART-012", "CART-013", "CART-014", "CART-015",
];

export const localidades = ["Costa", "Sierra"];

export const suscripciones = ["Essential", "Básico", "Premium"];

export const pedidosLicencia: PedidoLicencia[] = [
  { id: "PED-001", colegio: "Colegio San Martín", robot: "Robot Alpha", cartilla: "CART-001", cantidad: 10, estado: "Aprobado", fecha: "2026-02-01" },
  { id: "PED-002", colegio: "Colegio Santa Rosa", robot: "Robot Beta", cartilla: "CART-002", cantidad: 5, estado: "No Aprobado", fecha: "2026-02-03" },
  { id: "PED-003", colegio: "Instituto Técnico Nº 5", robot: "Robot Gamma", cartilla: "CART-003", cantidad: 15, estado: "Aprobado", fecha: "2026-02-05" },
  { id: "PED-004", colegio: "Escuela Normal Superior", robot: "Robot Delta", cartilla: "CART-004", cantidad: 8, estado: "No Aprobado", fecha: "2026-02-07" },
  { id: "PED-005", colegio: "Colegio del Sol", robot: "Robot Alpha", cartilla: "CART-005", cantidad: 12, estado: "Aprobado", fecha: "2026-02-08" },
  { id: "PED-006", colegio: "Instituto Belgrano", robot: "Robot Beta", cartilla: "CART-006", cantidad: 20, estado: "Aprobado", fecha: "2026-02-09" },
];

export const pedidosProfesores: PedidoProfesor[] = [
  { id: "PROF-001", ticket: "TK-5501", colegio: "Colegio San Martín", cantidadLicencias: 5, estado: "Aprobado", fecha: "2026-01-15", licenciasCreadas: ["LIC-P-001", "LIC-P-002", "LIC-P-003", "LIC-P-004", "LIC-P-005"] },
  { id: "PROF-002", ticket: "TK-5502", colegio: "Colegio Santa Rosa", cantidadLicencias: 3, estado: "No Aprobado", fecha: "2026-01-22" },
  { id: "PROF-003", ticket: "TK-5503", colegio: "Instituto Técnico Nº 5", cantidadLicencias: 10, estado: "Aprobado", fecha: "2026-02-03", licenciasCreadas: ["LIC-P-006", "LIC-P-007", "LIC-P-008", "LIC-P-009", "LIC-P-010", "LIC-P-011", "LIC-P-012", "LIC-P-013", "LIC-P-014", "LIC-P-015"] },
  { id: "PROF-004", ticket: "TK-5504", colegio: "Escuela Normal Superior", cantidadLicencias: 2, estado: "No Aprobado", fecha: "2026-02-05" },
];
