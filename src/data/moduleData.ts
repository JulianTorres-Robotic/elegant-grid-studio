// Mock data for all modules

export interface CartillaInfo {
  numero: string;
  tipo: "Física" | "Digital";
  categoria: string;
  colegio: string;
  robot: string;
  estado: "Activa" | "Perdida" | "Reasignada";
  suscripcion: string;
}

export interface PedidoLicencia {
  id: string;
  colegio: string;
  robot: string;
  tipoCartilla: string;
  cartilla: string;
  cantidad: number;
  ticket: string;
  estado: "Aprobado" | "No Aprobado" | "Pendiente";
  fecha: string;
}

export interface PedidoProfesor {
  id: string;
  ticket: string;
  colegio: string;
  cantidadLicencias: number;
  estado: "Aprobado" | "No Aprobado" | "Pendiente";
  fecha: string;
  licenciasCreadas?: string[];
}

export interface ReasignacionRegistro {
  id: string;
  cartilla: string;
  colegioAnterior: string;
  colegioFinal: string;
  ticket: string;
  fecha: string;
  estado: "Completada" | "Pendiente";
}

export interface ColegioInfo {
  nombre: string;
  codigoCorto: string;
  suscripcion: string;
}

export const colegiosInfo: ColegioInfo[] = [
  { nombre: "Colegio San Martín", codigoCorto: "SMAR", suscripcion: "Premium" },
  { nombre: "Colegio Santa Rosa", codigoCorto: "SROS", suscripcion: "Básico" },
  { nombre: "Instituto Técnico Nº 5", codigoCorto: "IT05", suscripcion: "Essential" },
  { nombre: "Escuela Normal Superior", codigoCorto: "ENSU", suscripcion: "Premium" },
  { nombre: "Colegio del Sol", codigoCorto: "CSOL", suscripcion: "Básico" },
  { nombre: "Instituto Belgrano", codigoCorto: "IBEL", suscripcion: "Premium" },
  { nombre: "Colegio Nacional", codigoCorto: "CNAC", suscripcion: "Essential" },
  { nombre: "Escuela Primaria Nº 12", codigoCorto: "EP12", suscripcion: "Básico" },
];

export const colegios = colegiosInfo.map((c) => c.nombre);

export const colegiosCodigos: Record<string, string> = Object.fromEntries(
  colegiosInfo.map((c) => [c.nombre, c.codigoCorto])
);

export const colegiosSuscripciones: Record<string, string> = Object.fromEntries(
  colegiosInfo.map((c) => [c.nombre, c.suscripcion])
);

export const robots = ["Robot Alpha", "Robot Beta", "Robot Gamma", "Robot Delta", "Robot Epsilon"];

// Tipos de cartilla (codificación)
export const tiposCartillaGenerales = ["110", "120", "130", "140", "150"];
export const tipoCartillaProfes = "810";
export const tipoCartillaPerdida = "910";

// Cartillas con formato de 7 dígitos
export const cartillasData: CartillaInfo[] = [
  { numero: "1100001", tipo: "Física", categoria: "110", colegio: "Colegio San Martín", robot: "Robot Alpha", estado: "Activa", suscripcion: "Premium" },
  { numero: "1100002", tipo: "Física", categoria: "110", colegio: "Colegio Santa Rosa", robot: "Robot Beta", estado: "Activa", suscripcion: "Básico" },
  { numero: "1200001", tipo: "Física", categoria: "120", colegio: "Instituto Técnico Nº 5", robot: "Robot Gamma", estado: "Activa", suscripcion: "Essential" },
  { numero: "1200002", tipo: "Física", categoria: "120", colegio: "Colegio del Sol", robot: "Robot Delta", estado: "Reasignada", suscripcion: "Básico" },
  { numero: "1300001", tipo: "Física", categoria: "130", colegio: "Instituto Belgrano", robot: "Robot Alpha", estado: "Activa", suscripcion: "Premium" },
  { numero: "1400001", tipo: "Física", categoria: "140", colegio: "Colegio Nacional", robot: "Robot Beta", estado: "Perdida", suscripcion: "Essential" },
  { numero: "1500001", tipo: "Física", categoria: "150", colegio: "Escuela Normal Superior", robot: "Robot Epsilon", estado: "Activa", suscripcion: "Premium" },
  { numero: "9100001", tipo: "Digital", categoria: "910", colegio: "Colegio San Martín", robot: "Robot Alpha", estado: "Perdida", suscripcion: "Premium" },
  { numero: "8100001", tipo: "Digital", categoria: "810", colegio: "Colegio Santa Rosa", robot: "Robot Beta", estado: "Activa", suscripcion: "Básico" },
  { numero: "8100002", tipo: "Digital", categoria: "810", colegio: "Instituto Técnico Nº 5", robot: "Robot Gamma", estado: "Activa", suscripcion: "Essential" },
  { numero: "1100003", tipo: "Física", categoria: "110", colegio: "Escuela Primaria Nº 12", robot: "Robot Delta", estado: "Activa", suscripcion: "Básico" },
  { numero: "1300002", tipo: "Física", categoria: "130", colegio: "Colegio San Martín", robot: "Robot Epsilon", estado: "Activa", suscripcion: "Premium" },
];

export const cartillas = cartillasData.map((c) => c.numero);

export const localidades = ["Costa", "Sierra"];

export const suscripciones = ["Essential", "Básico", "Premium"];

// Genera una licencia con formato XXXXXX-YYYY-ZZZZZZ
export const generarLicencia = (codigoVex: string, codigoColegio: string): string => {
  const vex = codigoVex.padStart(6, "0");
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, "0");
  return `${vex}-${codigoColegio}-${random}`;
};

// Genera licencia para profesores (PRRD)
export const generarLicenciaProfesor = (codigoVex: string): string => {
  const vex = codigoVex.padStart(6, "0");
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, "0");
  return `${vex}-PRRD-${random}`;
};

export const pedidosLicencia: PedidoLicencia[] = [
  { id: "PED-001", colegio: "Colegio San Martín", robot: "Robot Alpha", tipoCartilla: "110", cartilla: "1100001", cantidad: 10, ticket: "TK-1001", estado: "Aprobado", fecha: "2026-02-01" },
  { id: "PED-002", colegio: "Colegio Santa Rosa", robot: "Robot Beta", tipoCartilla: "110", cartilla: "1100002", cantidad: 5, ticket: "TK-1002", estado: "No Aprobado", fecha: "2026-02-03" },
  { id: "PED-003", colegio: "Instituto Técnico Nº 5", robot: "Robot Gamma", tipoCartilla: "120", cartilla: "1200001", cantidad: 15, ticket: "TK-1003", estado: "Aprobado", fecha: "2026-02-05" },
  { id: "PED-004", colegio: "Escuela Normal Superior", robot: "Robot Delta", tipoCartilla: "150", cartilla: "1500001", cantidad: 8, ticket: "TK-1004", estado: "Pendiente", fecha: "2026-02-07" },
  { id: "PED-005", colegio: "Colegio del Sol", robot: "Robot Alpha", tipoCartilla: "120", cartilla: "1200002", cantidad: 12, ticket: "TK-1005", estado: "Aprobado", fecha: "2026-02-08" },
  { id: "PED-006", colegio: "Instituto Belgrano", robot: "Robot Beta", tipoCartilla: "130", cartilla: "1300001", cantidad: 20, ticket: "TK-1006", estado: "Pendiente", fecha: "2026-02-09" },
];

export const pedidosProfesores: PedidoProfesor[] = [
  { id: "PROF-001", ticket: "TK-5501", colegio: "Colegio San Martín", cantidadLicencias: 5, estado: "Aprobado", fecha: "2026-01-15", licenciasCreadas: ["100001-PRRD-384729", "100002-PRRD-182736", "100003-PRRD-928374", "100004-PRRD-564738", "100005-PRRD-847362"] },
  { id: "PROF-002", ticket: "TK-5502", colegio: "Colegio Santa Rosa", cantidadLicencias: 3, estado: "No Aprobado", fecha: "2026-01-22" },
  { id: "PROF-003", ticket: "TK-5503", colegio: "Instituto Técnico Nº 5", cantidadLicencias: 10, estado: "Aprobado", fecha: "2026-02-03", licenciasCreadas: ["100006-PRRD-293847", "100007-PRRD-748392", "100008-PRRD-192837", "100009-PRRD-837462", "100010-PRRD-462839"] },
  { id: "PROF-004", ticket: "TK-5504", colegio: "Escuela Normal Superior", cantidadLicencias: 2, estado: "Pendiente", fecha: "2026-02-05" },
];

export const reasignacionesRegistro: ReasignacionRegistro[] = [
  { id: "REAS-001", cartilla: "1200002", colegioAnterior: "Colegio del Sol", colegioFinal: "Instituto Belgrano", ticket: "TK-3001", fecha: "2026-02-02", estado: "Completada" },
  { id: "REAS-002", cartilla: "1100001", colegioAnterior: "Colegio San Martín", colegioFinal: "Colegio Nacional", ticket: "TK-3002", fecha: "2026-02-06", estado: "Pendiente" },
  { id: "REAS-003", cartilla: "1300001", colegioAnterior: "Instituto Belgrano", colegioFinal: "Escuela Normal Superior", ticket: "TK-3003", fecha: "2026-02-10", estado: "Completada" },
];
