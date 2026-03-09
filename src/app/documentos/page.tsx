'use client';

import { useDocumentos } from "@/app/context/DocumentContext";
import DocumentTable from '@/app/components/DocumentTable';

export default function DocumentosPage() {
  const { documentos } = useDocumentos();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Documentos oficiales</h1>
        <p className="text-gray-600 mb-8">Todos los documentos públicos del municipio.</p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <DocumentTable documentos={documentos} />
        </div>
      </div>
    </div>
  );
}