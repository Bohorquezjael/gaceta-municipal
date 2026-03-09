'use client';

import { useDocumentos } from "@/app/context/DocumentContext";
import DocumentTable from '@/app/components/DocumentTable';

export default function TransparenciaPage() {
  const { documentos } = useDocumentos();
  // Filtrar documentos de transparencia (ejemplo: presupuestos, actas)
  const transparenciaDocs = documentos.filter(doc => 
    doc.titulo.toLowerCase().includes('presupuesto') || 
    doc.titulo.toLowerCase().includes('acta') ||
    doc.titulo.toLowerCase().includes('padrón')
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Transparencia</h1>
        <p className="text-gray-600 mb-8">Información financiera y obligaciones de transparencia del municipio.</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <DocumentTable documentos={transparenciaDocs} />
        </div>
      </div>
    </div>
  );
}