export interface Documento {
  id: string;
  modulo: string;       // Número de módulo (ej. "01")
  titulo: string;
  fecha: string;        // Formato "DD DE MES DE AÑO"
  semestre: 1 | 2;      // 1 = Primer semestre, 2 = Segundo semestre
  archivo: string;      // Ruta del PDF o enlace
  categoria?: string;
}
