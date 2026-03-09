'use client';

import { useDocumentos } from "@/app/context/DocumentContext";
import DocumentTable from '@/app/components/DocumentTable';

export default function EstructuraPage() {
  const { documentos } = useDocumentos();
  // Filtrar documentos de estructura organizacional
  const estructuraDocs = documentos.filter(doc => 
    doc.titulo.toLowerCase().includes('organigrama') || 
    doc.titulo.toLowerCase().includes('manual') ||
    doc.titulo.toLowerCase().includes('funciones') ||
    doc.titulo.toLowerCase().includes('código')
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Estructura organizacional</h1>
        <p className="text-gray-600 mb-8">Organigrama, manuales y códigos del ayuntamiento.</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <DocumentTable documentos={estructuraDocs} />
        </div>
      </div>
    </div>
  );
}